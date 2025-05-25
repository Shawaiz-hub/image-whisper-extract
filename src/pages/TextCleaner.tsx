
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import Header from "@/components/Header";
import { Copy, RotateCcw, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const TextCleaner = () => {
  const [inputText, setInputText] = useState("");
  const [cleanedText, setCleanedText] = useState("");
  const [options, setOptions] = useState({
    removeExtraSpaces: true,
    removeLineBreaks: false,
    removeNumbers: false,
    removeSpecialChars: false,
    removeHtmlTags: true,
    toLowerCase: false,
    toUpperCase: false,
  });

  const cleanText = () => {
    if (inputText.trim() === "") {
      toast({
        title: "Error",
        description: "Please enter some text to clean.",
        variant: "destructive",
      });
      return;
    }

    let cleaned = inputText;

    if (options.removeHtmlTags) {
      cleaned = cleaned.replace(/<[^>]*>/g, "");
    }

    if (options.removeExtraSpaces) {
      cleaned = cleaned.replace(/\s+/g, " ").trim();
    }

    if (options.removeLineBreaks) {
      cleaned = cleaned.replace(/\n/g, " ");
    }

    if (options.removeNumbers) {
      cleaned = cleaned.replace(/\d/g, "");
    }

    if (options.removeSpecialChars) {
      cleaned = cleaned.replace(/[^a-zA-Z0-9\s]/g, "");
    }

    if (options.toLowerCase) {
      cleaned = cleaned.toLowerCase();
    }

    if (options.toUpperCase) {
      cleaned = cleaned.toUpperCase();
    }

    setCleanedText(cleaned);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cleanedText);
    toast({
      title: "Success",
      description: "Cleaned text copied to clipboard!",
    });
  };

  const clearAll = () => {
    setInputText("");
    setCleanedText("");
  };

  const handleOptionChange = (option: string, checked: boolean) => {
    setOptions(prev => {
      const newOptions = { ...prev, [option]: checked };
      
      // Ensure only one case option is selected at a time
      if (option === "toLowerCase" && checked) {
        newOptions.toUpperCase = false;
      } else if (option === "toUpperCase" && checked) {
        newOptions.toLowerCase = false;
      }
      
      return newOptions;
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <div className="flex-1 py-8 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">Text Cleaner</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Enter your text</label>
                <Textarea
                  placeholder="Paste your text here to clean..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="min-h-[150px]"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-3 block">Cleaning Options</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="removeExtraSpaces"
                      checked={options.removeExtraSpaces}
                      onCheckedChange={(checked) => handleOptionChange("removeExtraSpaces", checked as boolean)}
                    />
                    <label htmlFor="removeExtraSpaces" className="text-sm">Remove extra spaces</label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="removeLineBreaks"
                      checked={options.removeLineBreaks}
                      onCheckedChange={(checked) => handleOptionChange("removeLineBreaks", checked as boolean)}
                    />
                    <label htmlFor="removeLineBreaks" className="text-sm">Remove line breaks</label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="removeNumbers"
                      checked={options.removeNumbers}
                      onCheckedChange={(checked) => handleOptionChange("removeNumbers", checked as boolean)}
                    />
                    <label htmlFor="removeNumbers" className="text-sm">Remove numbers</label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="removeSpecialChars"
                      checked={options.removeSpecialChars}
                      onCheckedChange={(checked) => handleOptionChange("removeSpecialChars", checked as boolean)}
                    />
                    <label htmlFor="removeSpecialChars" className="text-sm">Remove special characters</label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="removeHtmlTags"
                      checked={options.removeHtmlTags}
                      onCheckedChange={(checked) => handleOptionChange("removeHtmlTags", checked as boolean)}
                    />
                    <label htmlFor="removeHtmlTags" className="text-sm">Remove HTML tags</label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="toLowerCase"
                      checked={options.toLowerCase}
                      onCheckedChange={(checked) => handleOptionChange("toLowerCase", checked as boolean)}
                    />
                    <label htmlFor="toLowerCase" className="text-sm">Convert to lowercase</label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="toUpperCase"
                      checked={options.toUpperCase}
                      onCheckedChange={(checked) => handleOptionChange("toUpperCase", checked as boolean)}
                    />
                    <label htmlFor="toUpperCase" className="text-sm">Convert to uppercase</label>
                  </div>
                </div>
              </div>

              <Button onClick={cleanText} className="w-full">
                <Trash2 className="w-4 h-4 mr-2" />
                Clean Text
              </Button>

              {cleanedText && (
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium">Cleaned Text</label>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={copyToClipboard}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                  </div>
                  <Textarea
                    value={cleanedText}
                    readOnly
                    className="min-h-[150px]"
                  />
                </div>
              )}

              <div className="flex justify-center">
                <Button onClick={clearAll} variant="outline">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Clear All
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TextCleaner;
