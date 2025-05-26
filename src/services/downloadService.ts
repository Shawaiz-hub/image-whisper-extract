
import { validateVideoUrl, extractVideoId } from '@/utils/urlValidation';
import { DownloadItem } from '@/hooks/useDownloadQueue';

export interface DownloadOptions {
  quality?: 'highest' | 'medium' | 'lowest';
  format?: 'mp4' | 'mp3';
  onProgress?: (progress: number) => void;
}

export class DownloadService {
  private static async simulateDownload(
    item: DownloadItem,
    options: DownloadOptions,
    updateCallback: (updates: Partial<DownloadItem>) => void
  ): Promise<void> {
    // Simulate download progress
    updateCallback({ status: 'downloading', progress: 0 });
    
    for (let progress = 0; progress <= 100; progress += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      updateCallback({ progress });
      options.onProgress?.(progress);
    }
    
    // Simulate actual download trigger
    const backendUrl = `http://localhost:3000/download?url=${encodeURIComponent(item.url)}`;
    
    try {
      const link = document.createElement('a');
      link.href = backendUrl;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      updateCallback({ status: 'completed', progress: 100 });
    } catch (error) {
      updateCallback({ 
        status: 'error', 
        error: 'Failed to initiate download. Make sure the backend server is running.' 
      });
    }
  }

  static async downloadVideo(
    url: string,
    options: DownloadOptions = {},
    updateCallback: (updates: Partial<DownloadItem>) => void
  ): Promise<{ success: boolean; error?: string }> {
    const validation = validateVideoUrl(url);
    
    if (!validation.isValid) {
      return { success: false, error: validation.error };
    }

    const videoId = extractVideoId(url, validation.platform);
    if (!videoId) {
      return { success: false, error: 'Could not extract video ID from URL' };
    }

    const item: DownloadItem = {
      id: Date.now().toString(),
      url,
      title: `${validation.platform} video`,
      status: 'pending',
      progress: 0,
    };

    try {
      await this.simulateDownload(item, options, updateCallback);
      return { success: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Download failed';
      updateCallback({ status: 'error', error: errorMessage });
      return { success: false, error: errorMessage };
    }
  }
}
