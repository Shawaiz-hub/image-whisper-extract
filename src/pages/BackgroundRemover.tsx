
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { Upload, Download, Image as ImageIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const BackgroundRemover = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setSelectedImage(file);
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
    
    // This is a placeholder - real implementation would use background removal libraries
    // like @huggingface/transformers with segmentation models
    setTimeout(() => {
      toast({
        title: "Notice",
        description: "Background removal requires advanced AI models. This is a demo placeholder.",
      });
      setIsProcessing(false);
    }, 2000);
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
                Background Remover
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer flex flex-col items-center space-y-2"
                >
                  <Upload className="w-12 h-12 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    Click to upload an image or drag and drop
                  </span>
                  <span className="text-xs text-gray-400">
                    Supports JPG, PNG, JPEG
                  </span>
                </label>
              </div>

              {selectedImage && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Original Image</h3>
                    <img
                      src={URL.createObjectURL(selectedImage)}
                      alt="Original"
                      className="w-full h-64 object-cover rounded-lg border"
                    />
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Processed Image</h3>
                    <div className="w-full h-64 bg-gray-100 rounded-lg border flex items-center justify-center">
                      {processedImage ? (
                        <img
                          src={processedImage}
                          alt="Processed"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <div className="text-center text-gray-500">
                          <ImageIcon className="w-12 h-12 mx-auto mb-2" />
                          <p>Processed image will appear here</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {selectedImage && (
                <div className="flex justify-center space-x-4">
                  <Button 
                    onClick={removeBackground} 
                    disabled={isProcessing}
                    className="flex-1 max-w-xs"
                  >
                    {isProcessing ? "Processing..." : "Remove Background"}
                  </Button>
                  
                  {processedImage && (
                    <Button variant="outline" className="flex-1 max-w-xs">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  )}
                </div>
              )}

              <div className="text-center text-sm text-muted-foreground">
                <p>⚠️ Note: Real background removal requires AI models like:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>@huggingface/transformers with segmentation models</li>
                  <li>Backend processing with libraries like rembg (Python)</li>
                  <li>Cloud services like Remove.bg API</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BackgroundRemover;
