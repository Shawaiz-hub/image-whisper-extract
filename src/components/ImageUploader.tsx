
import React, { useState, useRef, DragEvent } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Image } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const processFile = (file: File) => {
    // Check if the file is an image
    if (!file.type.match("image.*")) {
      console.error("Only image files are allowed");
      return;
    }

    // Create a URL for preview
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setSelectedImage(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);

    // Pass the file to the parent component
    onImageUpload(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center transition-all cursor-pointer bg-secondary/50 hover:bg-secondary",
          isDragging && "drag-active"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={triggerFileInput}
      >
        {selectedImage ? (
          <div className="w-full flex flex-col items-center">
            <div className="relative w-full max-w-md overflow-hidden rounded-md">
              <img
                src={selectedImage}
                alt="Selected"
                className="w-full h-auto object-contain max-h-80"
              />
              <div className="absolute bottom-2 right-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage(null);
                    if (fileInputRef.current) {
                      fileInputRef.current.value = "";
                    }
                  }}
                >
                  Change image
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Upload className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-1">Upload an image</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Drag & drop or click to browse
            </p>
            <Button variant="outline" className="pointer-events-none">
              <Image className="mr-2 h-4 w-4" />
              Select image
            </Button>
          </>
        )}
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInput}
        accept="image/*"
        className="hidden"
      />
      {selectedImage && (
        <p className="text-xs text-center mt-2 text-muted-foreground">
          Image uploaded successfully. Click "Extract Text" to process.
        </p>
      )}
    </div>
  );
};

export default ImageUploader;
