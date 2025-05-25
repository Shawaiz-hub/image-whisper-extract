
import React from 'react';
import { Link, useLocation } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import ThemeToggle from './ThemeToggle';

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
    <header className="bg-gradient-to-r from-primary via-purple-600 to-blue-600 py-4 px-6 flex items-center justify-between shadow-lg">
      <div className="flex items-center gap-3">
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="relative">
            <div className="h-12 w-12 rounded-xl flex items-center justify-center">
              <img 
                src="/lovable-uploads/3fd2750b-5f16-4f89-8d3f-31102db915a2.png" 
                alt="Shawaiz Logo" 
                className="h-10 w-10 object-contain"
                style={{
                  filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.3))'
                }}
              />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white leading-tight">
              Shawaiz
            </h1>
            <p className="text-white/80 text-sm -mt-1">
              AI-Powered Tools
            </p>
          </div>
        </Link>
      </div>
      
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-white bg-transparent hover:bg-white/20 backdrop-blur-sm">
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
            <NavigationMenuTrigger className="text-white bg-transparent hover:bg-white/20 backdrop-blur-sm">
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
            <NavigationMenuTrigger className="text-white bg-transparent hover:bg-white/20 backdrop-blur-sm">
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

      <div className="flex items-center gap-3">
        <ThemeToggle />
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg">
          <img 
            src="/lovable-uploads/3fd2750b-5f16-4f89-8d3f-31102db915a2.png" 
            alt="AI Icon" 
            className="w-4 h-4 object-contain"
          />
          <span className="text-sm font-medium text-white">AI-Powered</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
