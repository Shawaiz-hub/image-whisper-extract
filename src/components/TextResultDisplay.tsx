
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface TextResultDisplayProps {
  text: string;
  onTextChange: (text: string) => void;
}

const TextResultDisplay: React.FC<TextResultDisplayProps> = ({
  text,
  onTextChange,
}) => {
  const { toast } = useToast();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const copyToClipboard = async () => {
    if (text) {
      try {
        await navigator.clipboard.writeText(text);
        toast({
          title: "Text copied to clipboard",
          description: "The extracted text has been copied to your clipboard",
        });
      } catch (error) {
        toast({
          title: "Failed to copy",
          description: "Could not copy text to clipboard",
          variant: "destructive",
        });
      }
    }
  };

  const downloadAsTextFile = () => {
    if (text) {
      const element = document.createElement("a");
      const file = new Blob([text], { type: "text/plain" });
      element.href = URL.createObjectURL(file);
      element.download = "extracted-text.txt";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      
      toast({
        title: "Text file downloaded",
        description: "The extracted text has been downloaded as a .txt file",
      });
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onTextChange(e.target.value);
  };

  if (!text) {
    return null;
  }

  return (
    <Card className="w-full mt-6">
      <CardContent className="pt-6">
        <h3 className="text-lg font-medium mb-2">Extracted Text</h3>
        <Textarea
          ref={textAreaRef}
          value={text}
          onChange={handleTextChange}
          className="min-h-[200px] font-mono text-sm"
          placeholder="Extracted text will appear here..."
        />
      </CardContent>
      <CardFooter className="flex justify-end space-x-2 pt-2 pb-4">
        <Button variant="outline" onClick={copyToClipboard}>
          <Copy className="mr-2 h-4 w-4" /> Copy
        </Button>
        <Button variant="outline" onClick={downloadAsTextFile}>
          <Download className="mr-2 h-4 w-4" /> Download
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TextResultDisplay;
