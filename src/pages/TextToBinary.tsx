
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import { Copy, RotateCcw } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const TextToBinary = () => {
  const [inputText, setInputText] = useState("");
  const [binaryOutput, setBinaryOutput] = useState("");
  const [binaryInput, setBinaryInput] = useState("");
  const [textOutput, setTextOutput] = useState("");

  const textToBinary = (text: string) => {
    return text
      .split("")
      .map(char => char.charCodeAt(0).toString(2).padStart(8, "0"))
      .join(" ");
  };

  const binaryToText = (binary: string) => {
    try {
      return binary
        .split(" ")
        .map(bin => String.fromCharCode(parseInt(bin, 2)))
        .join("");
    } catch (error) {
      return "Invalid binary format";
    }
  };

  const handleTextToBinary = () => {
    if (inputText.trim() === "") {
      toast({
        title: "Error",
        description: "Please enter some text to convert.",
        variant: "destructive",
      });
      return;
    }
    setBinaryOutput(textToBinary(inputText));
  };

  const handleBinaryToText = () => {
    if (binaryInput.trim() === "") {
      toast({
        title: "Error",
        description: "Please enter binary code to convert.",
        variant: "destructive",
      });
      return;
    }
    setTextOutput(binaryToText(binaryInput));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Success",
      description: "Copied to clipboard!",
    });
  };

  const clearAll = () => {
    setInputText("");
    setBinaryOutput("");
    setBinaryInput("");
    setTextOutput("");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <div className="flex-1 py-8 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">Text to Binary Converter</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="text-to-binary" className="space-y-6">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="text-to-binary">Text to Binary</TabsTrigger>
                  <TabsTrigger value="binary-to-text">Binary to Text</TabsTrigger>
                </TabsList>
                
                <TabsContent value="text-to-binary" className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Enter your text</label>
                    <Textarea
                      placeholder="Type your text here..."
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      className="min-h-[120px]"
                    />
                  </div>
                  
                  <Button onClick={handleTextToBinary} className="w-full">
                    Convert to Binary
                  </Button>
                  
                  {binaryOutput && (
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-sm font-medium">Binary Output</label>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyToClipboard(binaryOutput)}
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          Copy
                        </Button>
                      </div>
                      <Textarea
                        value={binaryOutput}
                        readOnly
                        className="min-h-[120px] font-mono text-sm"
                      />
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="binary-to-text" className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Enter binary code</label>
                    <Textarea
                      placeholder="Paste binary code here (e.g., 01001000 01100101 01101100 01101100 01101111)"
                      value={binaryInput}
                      onChange={(e) => setBinaryInput(e.target.value)}
                      className="min-h-[120px] font-mono text-sm"
                    />
                  </div>
                  
                  <Button onClick={handleBinaryToText} className="w-full">
                    Convert to Text
                  </Button>
                  
                  {textOutput && (
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-sm font-medium">Text Output</label>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyToClipboard(textOutput)}
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          Copy
                        </Button>
                      </div>
                      <Textarea
                        value={textOutput}
                        readOnly
                        className="min-h-[120px]"
                      />
                    </div>
                  )}
                </TabsContent>
              </Tabs>
              
              <div className="flex justify-center mt-6">
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

export default TextToBinary;
