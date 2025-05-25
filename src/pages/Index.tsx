
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { Link } from "react-router-dom";
import { 
  FileText, 
  Download, 
  Image, 
  Youtube, 
  MessageSquare, 
  Binary,
  Eraser,
  CheckCircle,
  Hash,
  Facebook,
  Music,
  Instagram,
  ImageIcon,
  FileImage,
  FileUp,
  FileDown
} from "lucide-react";

const Index = () => {
  const toolCategories = [
    {
      title: "Text Tools",
      icon: FileText,
      tools: [
        { name: "Text to Speech", href: "/text-to-speech", icon: MessageSquare, description: "Convert text to natural speech" },
        { name: "Text to Binary", href: "/text-to-binary", icon: Binary, description: "Convert text to binary code" },
        { name: "Text Cleaner", href: "/text-cleaner", icon: Eraser, description: "Clean and format your text" },
        { name: "Grammar Checker", href: "/grammar-checker", icon: CheckCircle, description: "Check and fix grammar errors" },
        { name: "Text Counter", href: "/text-counter", icon: Hash, description: "Count words, characters, and more" },
      ]
    },
    {
      title: "Media Downloaders",
      icon: Download,
      tools: [
        { name: "YouTube Downloader", href: "/youtube-downloader", icon: Youtube, description: "Download YouTube videos" },
        { name: "Facebook Downloader", href: "/facebook-downloader", icon: Facebook, description: "Download Facebook videos" },
        { name: "TikTok Downloader", href: "/tiktok-downloader", icon: Music, description: "Download TikTok videos" },
        { name: "Instagram Downloader", href: "/instagram-downloader", icon: Instagram, description: "Download Instagram content" },
        { name: "YouTube Thumbnail", href: "/youtube-thumbnail", icon: ImageIcon, description: "Extract YouTube thumbnails" },
      ]
    },
    {
      title: "File Tools",
      icon: Image,
      tools: [
        { name: "Background Remover", href: "/background-remover", icon: FileImage, description: "Remove image backgrounds" },
        { name: "Word to PDF", href: "/word-to-pdf", icon: FileUp, description: "Convert Word to PDF" },
        { name: "PDF to Word", href: "/pdf-to-word", icon: FileDown, description: "Convert PDF to Word" },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/10 via-purple-50 to-blue-50 dark:from-primary/5 dark:via-purple-900/20 dark:to-blue-900/20 py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            AI-Powered Tools
            <span className="block text-primary">for Everyone</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Transform your workflow with our comprehensive suite of AI-powered tools. 
            From text processing to media downloading and file conversion.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-sm">
              <span className="text-sm font-medium">✨ No Registration Required</span>
            </div>
            <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-sm">
              <span className="text-sm font-medium">🔒 Privacy Focused</span>
            </div>
            <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-sm">
              <span className="text-sm font-medium">⚡ Lightning Fast</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="flex-1 py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {toolCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <category.icon className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-3xl font-bold text-foreground">{category.title}</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.tools.map((tool, toolIndex) => (
                  <Card key={toolIndex} className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-3 text-lg">
                        <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                          <tool.icon className="h-5 w-5 text-primary" />
                        </div>
                        {tool.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-muted-foreground mb-4 text-sm">{tool.description}</p>
                      <Button asChild className="w-full">
                        <Link to={tool.href}>
                          Try Now
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-muted/50 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-muted-foreground">
            Built with ❤️ using modern web technologies. All tools work directly in your browser.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
