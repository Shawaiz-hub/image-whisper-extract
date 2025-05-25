
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import { Download, Youtube } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const YoutubeDownloader = () => {
  const [url, setUrl] = useState("");

  const handleDownload = () => {
    if (!url.trim()) {
      toast({
        title: "Error",
        description: "Please enter a YouTube URL.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Notice",
      description: "YouTube downloading requires backend implementation and may have legal restrictions.",
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <div className="flex-1 py-8 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
                <Youtube className="w-8 h-8 text-red-600" />
                YouTube Video Downloader
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-2 block">YouTube Video URL</label>
                <Input
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>

              <Button onClick={handleDownload} className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Download Video
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                <p className="mb-2">⚠️ Important Notice:</p>
                <p>YouTube video downloading requires:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Backend server implementation</li>
                  <li>Compliance with YouTube's Terms of Service</li>
                  <li>Respect for copyright laws</li>
                  <li>Usage of appropriate libraries (e.g., yt-dlp)</li>
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
