
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import { Download } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const InstagramDownloader = () => {
  const [url, setUrl] = useState("");

  const handleDownload = () => {
    toast({
      title: "Notice",
      description: "Instagram video downloading requires backend implementation.",
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <div className="flex-1 py-8 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">Instagram Video Downloader</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Input
                placeholder="Enter Instagram video/reel URL..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <Button onClick={handleDownload} className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Download Video
              </Button>
              <div className="text-center text-sm text-muted-foreground">
                <p>Requires backend implementation and compliance with Instagram's terms.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InstagramDownloader;
