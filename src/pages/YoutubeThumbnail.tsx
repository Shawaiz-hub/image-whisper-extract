
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import { Download, Image as ImageIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const YoutubeThumbnail = () => {
  const [url, setUrl] = useState("");
  const [thumbnails, setThumbnails] = useState<string[]>([]);

  const extractThumbnails = () => {
    if (!url.includes('youtube.com') && !url.includes('youtu.be')) {
      toast({
        title: "Error",
        description: "Please enter a valid YouTube URL.",
        variant: "destructive",
      });
      return;
    }

    // Extract video ID from URL
    const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1];
    
    if (videoId) {
      const thumbnailUrls = [
        `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
        `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
        `https://img.youtube.com/vi/${videoId}/sddefault.jpg`,
      ];
      setThumbnails(thumbnailUrls);
    }
  };

  const downloadThumbnail = (thumbnailUrl: string, quality: string) => {
    const link = document.createElement('a');
    link.href = thumbnailUrl;
    link.download = `youtube-thumbnail-${quality}.jpg`;
    link.target = '_blank';
    link.click();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <div className="flex-1 py-8 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
                <ImageIcon className="w-8 h-8" />
                YouTube Thumbnail Downloader
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

              <Button onClick={extractThumbnails} className="w-full">
                <ImageIcon className="w-4 h-4 mr-2" />
                Extract Thumbnails
              </Button>

              {thumbnails.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Available Thumbnails</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {thumbnails.map((thumbnail, index) => {
                      const qualities = ['Max Resolution', 'High Quality', 'Medium Quality', 'Standard Quality'];
                      return (
                        <div key={index} className="border rounded-lg p-4">
                          <img
                            src={thumbnail}
                            alt={`Thumbnail ${qualities[index]}`}
                            className="w-full h-32 object-cover rounded mb-2"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                          <div className="text-sm font-medium mb-2">{qualities[index]}</div>
                          <Button
                            size="sm"
                            onClick={() => downloadThumbnail(thumbnail, qualities[index].toLowerCase().replace(' ', '-'))}
                            className="w-full"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default YoutubeThumbnail;
