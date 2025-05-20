
import React from 'react';
import { Image } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-primary py-4 px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img 
          src="/lovable-uploads/839a85b4-a8c3-49d1-9e4f-753823957697.png" 
          alt="Shawaiz Image2Text Extractor Logo" 
          className="h-10 w-10"
        />
        <h1 className="text-2xl font-bold text-primary-foreground">
          Shawaiz-Image2Text-Extractor
        </h1>
      </div>
      <div className="flex items-center gap-2">
        <Image className="text-primary-foreground" />
        <span className="text-sm font-medium text-primary-foreground">OCR Technology</span>
      </div>
    </header>
  );
};

export default Header;
