
import React from 'react';
import { Image } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Header = () => {
  const location = useLocation();

  const textTools = [
    { name: "Text to Speech", href: "/text-to-speech" },
    { name: "Text to Binary", href: "/text-to-binary" },
    { name: "Text Cleaner", href: "/text-cleaner" },
    { name: "Grammar Checker", href: "/grammar-checker" },
    { name: "Text Counter", href: "/text-counter" },
  ];

  const mediaTools = [
    { name: "YouTube Downloader", href: "/youtube-downloader" },
    { name: "Facebook Downloader", href: "/facebook-downloader" },
    { name: "TikTok Downloader", href: "/tiktok-downloader" },
    { name: "Instagram Downloader", href: "/instagram-downloader" },
    { name: "YouTube Thumbnail", href: "/youtube-thumbnail" },
  ];

  const fileTools = [
    { name: "Background Remover", href: "/background-remover" },
    { name: "Word to PDF", href: "/word-to-pdf" },
    { name: "PDF to Word", href: "/pdf-to-word" },
  ];

  return (
    <header className="bg-primary py-4 px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Link to="/" className="flex items-center gap-3">
          <img 
            src="/lovable-uploads/839a85b4-a8c3-49d1-9e4f-753823957697.png" 
            alt="Shawaiz Image2Text Extractor Logo" 
            className="h-10 w-10"
          />
          <h1 className="text-2xl font-bold text-primary-foreground">
            Shawaiz-Image2Text-Extractor
          </h1>
        </Link>
      </div>
      
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-primary-foreground bg-transparent hover:bg-primary/80">
              Text Tools
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {textTools.map((tool) => (
                  <NavigationMenuLink key={tool.href} asChild>
                    <Link
                      to={tool.href}
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <div className="text-sm font-medium leading-none">{tool.name}</div>
                    </Link>
                  </NavigationMenuLink>
                ))}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-primary-foreground bg-transparent hover:bg-primary/80">
              Media Tools
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {mediaTools.map((tool) => (
                  <NavigationMenuLink key={tool.href} asChild>
                    <Link
                      to={tool.href}
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <div className="text-sm font-medium leading-none">{tool.name}</div>
                    </Link>
                  </NavigationMenuLink>
                ))}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-primary-foreground bg-transparent hover:bg-primary/80">
              File Tools
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid w-[300px] gap-3 p-4">
                {fileTools.map((tool) => (
                  <NavigationMenuLink key={tool.href} asChild>
                    <Link
                      to={tool.href}
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <div className="text-sm font-medium leading-none">{tool.name}</div>
                    </Link>
                  </NavigationMenuLink>
                ))}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className="flex items-center gap-2">
        <Image className="text-primary-foreground" />
        <span className="text-sm font-medium text-primary-foreground">OCR Technology</span>
      </div>
    </header>
  );
};

export default Header;
