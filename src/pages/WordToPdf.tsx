
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { Upload, Download, FileText } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const WordToPdf = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.includes('word') || file.name.endsWith('.docx') || file.name.endsWith('.doc')) {
        setSelectedFile(file);
      } else {
        toast({
          title: "Error",
          description: "Please select a valid Word document (.doc or .docx).",
          variant: "destructive",
        });
      }
    }
  };

  const convertToPdf = () => {
    toast({
      title: "Notice",
      description: "Word to PDF conversion requires backend implementation with libraries like docx2pdf or LibreOffice.",
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <div className="flex-1 py-8 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
                <FileText className="w-8 h-8" />
                Word to PDF Converter
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <input
                  type="file"
                  accept=".doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="word-upload"
                />
                <label
                  htmlFor="word-upload"
                  className="cursor-pointer flex flex-col items-center space-y-2"
                >
                  <Upload className="w-12 h-12 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    Click to upload a Word document
                  </span>
                  <span className="text-xs text-gray-400">
                    Supports .doc and .docx files
                  </span>
                </label>
              </div>

              {selectedFile && (
                <div className="text-center">
                  <div className="inline-flex items-center space-x-2 mb-4">
                    <FileText className="w-6 h-6" />
                    <span className="font-medium">{selectedFile.name}</span>
                  </div>
                  <Button onClick={convertToPdf} className="w-full max-w-xs">
                    <Download className="w-4 h-4 mr-2" />
                    Convert to PDF
                  </Button>
                </div>
              )}

              <div className="text-center text-sm text-muted-foreground">
                <p>⚠️ Note: PDF conversion requires backend processing with:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Python libraries (docx2pdf, python-docx)</li>
                  <li>LibreOffice headless conversion</li>
                  <li>Cloud services like CloudConvert API</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WordToPdf;
