
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import ImageUploader from "@/components/ImageUploader";
import OCRProcessor from "@/components/OCRProcessor";
import TextResultDisplay from "@/components/TextResultDisplay";
import Header from "@/components/Header";

const Index = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState("");

  const handleImageUpload = (file: File) => {
    setImageFile(file);
    // Reset text when new image is uploaded
    setExtractedText("");
  };

  const handleTextExtracted = (text: string) => {
    setExtractedText(text);
  };

  const handleTextChange = (text: string) => {
    setExtractedText(text);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <div className="flex-1 py-8 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 gap-8">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Upload your image</h2>
                <ImageUploader onImageUpload={handleImageUpload} />
                
                {imageFile && (
                  <div className="mt-6">
                    <OCRProcessor
                      imageFile={imageFile}
                      onTextExtracted={handleTextExtracted}
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {extractedText && (
              <TextResultDisplay
                text={extractedText}
                onTextChange={handleTextChange}
              />
            )}

            <div className="text-center text-sm text-muted-foreground mt-8">
              <p>
                Shawaiz-Image2Text-Extractor performs OCR operations directly in your browser.
                <br />
                Your images are processed locally and are not uploaded to any server.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
