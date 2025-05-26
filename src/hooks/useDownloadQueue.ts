
import { useState, useCallback } from 'react';
import { toast } from "@/hooks/use-toast";

export interface DownloadItem {
  id: string;
  url: string;
  title: string;
  status: 'pending' | 'downloading' | 'completed' | 'error';
  progress: number;
  error?: string;
}

export const useDownloadQueue = () => {
  const [queue, setQueue] = useState<DownloadItem[]>([]);

  const addToQueue = useCallback((url: string, title?: string) => {
    const id = Date.now().toString();
    const newItem: DownloadItem = {
      id,
      url,
      title: title || `Video ${id}`,
      status: 'pending',
      progress: 0,
    };

    setQueue(prev => [...prev, newItem]);
    return id;
  }, []);

  const updateDownloadStatus = useCallback((id: string, updates: Partial<DownloadItem>) => {
    setQueue(prev => prev.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ));
  }, []);

  const removeFromQueue = useCallback((id: string) => {
    setQueue(prev => prev.filter(item => item.id !== id));
  }, []);

  const clearQueue = useCallback(() => {
    setQueue([]);
  }, []);

  return {
    queue,
    addToQueue,
    updateDownloadStatus,
    removeFromQueue,
    clearQueue,
  };
};
