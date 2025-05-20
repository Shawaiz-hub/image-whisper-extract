
import React, { useState, useEffect } from "react";
import { createWorker } from "tesseract.js";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

interface OCRProcessorProps {
  imageFile: File | null;
  onTextExtracted: (text: string) => void;
}

const OCRProcessor: React.FC<OCRProcessorProps> = ({ imageFile, onTextExtracted }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState("");
  const { toast } = useToast();

  const processImage = async () => {
    if (!imageFile) {
      toast({
        title: "No image selected",
        description: "Please upload an image first",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    setProgress(0);
    setStatusMessage("Initializing OCR engine...");

    try {
      const worker = await createWorker({
        logger: (m) => {
          if (m.status === "recognizing text") {
            setProgress(m.progress * 100);
            setStatusMessage(`Recognizing text... ${Math.round(m.progress * 100)}%`);
          } else {
            setStatusMessage(m.status);
          }
        },
      });

      await worker.loadLanguage("eng");
      await worker.initialize("eng");
      setStatusMessage("Processing image...");

      const { data } = await worker.recognize(imageFile);
      
      if (data.text) {
        onTextExtracted(data.text);
        toast({
          title: "Text extracted successfully",
          description: `Found ${data.text.split(/\s+/).length} words in the image`,
        });
      } else {
        toast({
          title: "No text found",
          description: "The OCR engine could not find any text in this image",
          variant: "destructive",
        });
      }

      await worker.terminate();
    } catch (error) {
      console.error("OCR processing error:", error);
      toast({
        title: "Error processing image",
        description: "An error occurred while extracting text from the image",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full">
      <Button
        onClick={processImage}
        disabled={!imageFile || isProcessing}
        className="w-full"
      >
        {isProcessing ? "Processing..." : "Extract Text"}
      </Button>

      {isProcessing && (
        <div className="mt-4">
          <div className="flex justify-between mb-2 text-sm">
            <span>{statusMessage}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="w-full" />
        </div>
      )}
    </div>
  );
};

export default OCRProcessor;
