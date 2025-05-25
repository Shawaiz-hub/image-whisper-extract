
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { Upload, Download, Image as ImageIcon, Loader2, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { removeBgFromImage } from "@/services/removeBgService";

const BackgroundRemover = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setSelectedImage(file);
        setOriginalImageUrl(URL.createObjectURL(file));
        setProcessedImage(null);
      } else {
        toast({
          title: "Error",
          description: "Please select a valid image file.",
          variant: "destructive",
        });
      }
    }
  };

  const removeBackground = async () => {
    if (!selectedImage) return;

    setIsProcessing(true);
    
    try {
      const result = await removeBgFromImage(selectedImage);
      
      if (result.success && result.imageUrl) {
        setProcessedImage(result.imageUrl);
        toast({
          title: "Success!",
          description: "Background removed successfully!",
        });
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to remove background",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadImage = () => {
    if (!processedImage) return;
    
    const link = document.createElement('a');
    link.href = processedImage;
    link.download = `removed-bg-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetImages = () => {
    setSelectedImage(null);
    setProcessedImage(null);
    setOriginalImageUrl(null);
    const input = document.getElementById('image-upload') as HTMLInputElement;
    if (input) input.value = '';
  };

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <Header />
      
      <div className="py-8 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <Card className="shadow-xl border-2 bg-gradient-to-br from-card to-card/90">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent flex items-center justify-center gap-3">
                <ImageIcon className="w-10 h-10 text-primary" />
                AI Background Remover
              </CardTitle>
              <p className="text-muted-foreground text-lg mt-2">
                Remove backgrounds from your images instantly using AI
              </p>
            </CardHeader>
            <CardContent className="space-y-8">
              {!selectedImage ? (
                <div className="border-2 border-dashed border-primary/30 rounded-xl p-12 text-center bg-gradient-to-br from-primary/5 to-purple-500/5 hover:from-primary/10 hover:to-purple-500/10 transition-all duration-300">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer flex flex-col items-center space-y-4"
                  >
                    <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
                      <Upload className="w-10 h-10 text-primary" />
                    </div>
                    <div>
                      <span className="text-xl font-semibold text-foreground">
                        Choose an image to get started
                      </span>
                      <p className="text-muted-foreground mt-2">
                        Drag and drop or click to browse
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Supports JPG, PNG, JPEG (max 12MB)
                      </p>
                    </div>
                  </label>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold">Original Image</h3>
                        <Button variant="outline" size="sm" onClick={resetImages}>
                          <Trash2 className="w-4 h-4 mr-2" />
                          Reset
                        </Button>
                      </div>
                      <div className="relative">
                        <img
                          src={originalImageUrl!}
                          alt="Original"
                          className="w-full h-80 object-contain rounded-lg border-2 bg-white shadow-lg"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold">Processed Image</h3>
                      <div className="relative h-80 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-lg border-2 flex items-center justify-center">
                        {processedImage ? (
                          <img
                            src={processedImage}
                            alt="Processed"
                            className="w-full h-full object-contain rounded-lg"
                            style={{
                              background: 'repeating-conic-gradient(#808080 0% 25%, transparent 0% 50%) 50% / 20px 20px'
                            }}
                          />
                        ) : (
                          <div className="text-center text-muted-foreground">
                            <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
                            <p className="text-lg">Processed image will appear here</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Button 
                      onClick={removeBackground} 
                      disabled={isProcessing}
                      className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white px-8 py-3 text-lg font-semibold"
                      size="lg"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <ImageIcon className="w-5 h-5 mr-2" />
                          Remove Background
                        </>
                      )}
                    </Button>
                    
                    {processedImage && (
                      <Button 
                        onClick={downloadImage}
                        variant="outline" 
                        size="lg"
                        className="px-8 py-3 text-lg font-semibold border-2"
                      >
                        <Download className="w-5 h-5 mr-2" />
                        Download Image
                      </Button>
                    )}
                  </div>
                </div>
              )}

              <div className="text-center text-sm text-muted-foreground bg-muted/50 rounded-lg p-6">
                <div className="flex items-center justify-center mb-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="font-semibold">Powered by Remove.bg AI</span>
                </div>
                <p className="mb-2">✨ High-quality background removal using advanced AI technology</p>
                <p>🔒 Your images are processed securely and not stored on our servers</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BackgroundRemover;
