
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Header from "@/components/Header";
import DownloadProgress from "@/components/DownloadProgress";
import { Download, Youtube, Loader2, Plus, Trash2, AlertCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useDownloadQueue } from "@/hooks/useDownloadQueue";
import { validateVideoUrl } from "@/utils/urlValidation";
import { DownloadService } from "@/services/downloadService";

const YoutubeDownloader = () => {
  const [url, setUrl] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);
  const [validationError, setValidationError] = useState<string>("");
  
  const { 
    queue, 
    addToQueue, 
    updateDownloadStatus, 
    removeFromQueue, 
    clearQueue 
  } = useDownloadQueue();

  const validateInput = (inputUrl: string) => {
    const validation = validateVideoUrl(inputUrl);
    if (!validation.isValid) {
      setValidationError(validation.error || "Invalid URL");
      return false;
    }
    setValidationError("");
    return true;
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    setUrl(newUrl);
    
    if (newUrl.trim()) {
      validateInput(newUrl);
    } else {
      setValidationError("");
    }
  };

  const handleAddToQueue = () => {
    if (!url.trim()) {
      setValidationError("Please enter a URL");
      return;
    }

    if (!validateInput(url)) {
      return;
    }

    const validation = validateVideoUrl(url);
    const title = `${validation.platform} video - ${new Date().toLocaleTimeString()}`;
    
    addToQueue(url, title);
    setUrl("");
    setValidationError("");
    
    toast({
      title: "Added to Queue",
      description: "Video has been added to the download queue.",
    });
  };

  const handleDownloadAll = async () => {
    if (queue.length === 0) {
      toast({
        title: "No Downloads",
        description: "Please add videos to the queue first.",
        variant: "destructive",
      });
      return;
    }

    setIsDownloading(true);

    for (const item of queue) {
      if (item.status === 'pending') {
        await DownloadService.downloadVideo(
          item.url,
          {
            onProgress: (progress) => {
              updateDownloadStatus(item.id, { progress });
            }
          },
          (updates) => {
            updateDownloadStatus(item.id, updates);
          }
        );
      }
    }

    setIsDownloading(false);
    
    toast({
      title: "Downloads Completed",
      description: "All downloads have been processed.",
    });
  };

  const handleSingleDownload = async () => {
    if (!url.trim()) {
      setValidationError("Please enter a URL");
      return;
    }

    if (!validateInput(url)) {
      return;
    }

    setIsDownloading(true);

    const result = await DownloadService.downloadVideo(
      url,
      {},
      () => {} // No callback needed for single download
    );

    setIsDownloading(false);

    if (result.success) {
      toast({
        title: "Download Started",
        description: "Your video download has been initiated.",
      });
      setUrl("");
    } else {
      toast({
        title: "Download Failed",
        description: result.error || "Unknown error occurred.",
        variant: "destructive",
      });
    }
  };

  const getUrlInputVariant = () => {
    if (!url.trim()) return "";
    return validationError ? "border-red-500 focus-visible:ring-red-500" : "border-green-500 focus-visible:ring-green-500";
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <div className="flex-1 py-8 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
                <Youtube className="w-8 h-8 text-red-600" />
                Universal Video Downloader
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="video-url">Video URL (YouTube, Facebook, Instagram)</Label>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Input
                      id="video-url"
                      placeholder="https://www.youtube.com/watch?v=... or Facebook/Instagram URL"
                      value={url}
                      onChange={handleUrlChange}
                      disabled={isDownloading}
                      className={getUrlInputVariant()}
                    />
                    {validationError && (
                      <Alert className="mt-2" variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{validationError}</AlertDescription>
                      </Alert>
                    )}
                  </div>
                  <Button 
                    onClick={handleAddToQueue}
                    disabled={isDownloading || !!validationError || !url.trim()}
                    variant="outline"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={handleSingleDownload} 
                  className="flex-1" 
                  disabled={isDownloading || !!validationError || !url.trim()}
                >
                  {isDownloading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Downloading...
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 mr-2" />
                      Download Now
                    </>
                  )}
                </Button>
                
                {queue.length > 0 && (
                  <Button 
                    onClick={handleDownloadAll}
                    disabled={isDownloading}
                    variant="secondary"
                  >
                    Download All ({queue.length})
                  </Button>
                )}
              </div>

              {queue.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Download Queue</h3>
                    <Button 
                      onClick={clearQueue}
                      variant="outline" 
                      size="sm"
                      disabled={isDownloading}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Clear Queue
                    </Button>
                  </div>
                  
                  <div className="max-h-60 overflow-y-auto space-y-2">
                    {queue.map((item) => (
                      <DownloadProgress
                        key={item.id}
                        item={item}
                        onRemove={removeFromQueue}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Enhanced Features:</h3>
                <ul className="list-disc list-inside text-sm text-blue-700 dark:text-blue-300 space-y-1">
                  <li>✅ Real-time download progress tracking</li>
                  <li>✅ Support for YouTube, Facebook, and Instagram</li>
                  <li>✅ Download queue for multiple videos</li>
                  <li>✅ Advanced URL validation</li>
                  <li>✅ Enhanced error handling and feedback</li>
                  <li>⚠️ Backend server required on localhost:3000</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default YoutubeDownloader;
