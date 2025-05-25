
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import { Download, Facebook, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const FacebookDownloader = () => {
  const [url, setUrl] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (!url.trim()) {
      toast({
        title: "Error",
        description: "Please enter a Facebook URL.",
        variant: "destructive",
      });
      return;
    }

    if (!url.includes('facebook.com') && !url.includes('fb.watch')) {
      toast({
        title: "Error",
        description: "Please enter a valid Facebook URL.",
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
        description: "Your Facebook video download has been initiated.",
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
                <Facebook className="w-8 h-8 text-blue-600" />
                Facebook Video Downloader
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Facebook Video URL</label>
                <Input
                  placeholder="https://www.facebook.com/watch?v=..."
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

              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Important Notes:</h3>
                <ul className="list-disc list-inside text-sm text-blue-700 dark:text-blue-300 space-y-1">
                  <li>Only public videos can be downloaded</li>
                  <li>Respect copyright and Facebook's terms of service</li>
                  <li>Backend server must be running on localhost:3000</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FacebookDownloader;
