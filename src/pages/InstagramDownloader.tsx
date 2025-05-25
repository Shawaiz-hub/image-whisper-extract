
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import { Download, Instagram, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const InstagramDownloader = () => {
  const [url, setUrl] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (!url.trim()) {
      toast({
        title: "Error",
        description: "Please enter an Instagram URL.",
        variant: "destructive",
      });
      return;
    }

    if (!url.includes('instagram.com')) {
      toast({
        title: "Error",
        description: "Please enter a valid Instagram URL.",
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
        description: "Your Instagram content download has been initiated.",
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Unable to download content. Make sure the backend server is running.",
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
                <Instagram className="w-8 h-8 text-pink-600" />
                Instagram Downloader
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Instagram Post/Reel URL</label>
                <Input
                  placeholder="https://www.instagram.com/p/..."
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
                    Download Content
                  </>
                )}
              </Button>

              <div className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 p-4 rounded-lg">
                <h3 className="font-semibold text-pink-800 dark:text-pink-200 mb-2">Supported Content:</h3>
                <ul className="list-disc list-inside text-sm text-pink-700 dark:text-pink-300 space-y-1">
                  <li>Instagram Posts (photos & videos)</li>
                  <li>Instagram Reels</li>
                  <li>IGTV videos</li>
                  <li>Stories (if public)</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InstagramDownloader;
