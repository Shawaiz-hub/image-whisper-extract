
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import { Download, Music, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const TiktokDownloader = () => {
  const [url, setUrl] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (!url.trim()) {
      toast({
        title: "Error",
        description: "Please enter a TikTok URL.",
        variant: "destructive",
      });
      return;
    }

    if (!url.includes('tiktok.com')) {
      toast({
        title: "Error",
        description: "Please enter a valid TikTok URL.",
        variant: "destructive",
      });
      return;
    }

    setIsDownloading(true);
    
    try {
      const backendUrl = `http://localhost:3000/download?url=${encodeURIComponent(url)}`;
      
      const link = document.createElement('a');
      link.href = backendUrl;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "Download Started",
        description: "Your TikTok video download has been initiated.",
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Unable to download video. Make sure the backend server is running.",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <div className="flex-1 py-8 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
                <Music className="w-8 h-8 text-pink-600" />
                TikTok Video Downloader
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-2 block">TikTok Video URL</label>
                <Input
                  placeholder="https://www.tiktok.com/@username/video/..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  disabled={isDownloading}
                />
              </div>

              <Button 
                onClick={handleDownload} 
                className="w-full" 
                disabled={isDownloading}
              >
                {isDownloading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Downloading...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Download Video
                  </>
                )}
              </Button>

              <div className="bg-pink-50 dark:bg-pink-900/20 p-4 rounded-lg">
                <h3 className="font-semibold text-pink-800 dark:text-pink-200 mb-2">Backend Setup:</h3>
                <ol className="list-decimal list-inside text-sm text-pink-700 dark:text-pink-300 space-y-1">
                  <li>Install dependencies: <code className="bg-pink-100 dark:bg-pink-800 px-1 rounded">npm install express axios</code></li>
                  <li>Create the TikTok server.js file with the provided code</li>
                  <li>Start server on port 3000</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TiktokDownloader;
