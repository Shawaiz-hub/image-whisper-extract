
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import TextToSpeech from "./pages/TextToSpeech";
import TextToBinary from "./pages/TextToBinary";
import TextCleaner from "./pages/TextCleaner";
import GrammarChecker from "./pages/GrammarChecker";
import TextCounter from "./pages/TextCounter";
import YoutubeDownloader from "./pages/YoutubeDownloader";
import FacebookDownloader from "./pages/FacebookDownloader";
import TiktokDownloader from "./pages/TiktokDownloader";
import InstagramDownloader from "./pages/InstagramDownloader";
import YoutubeThumbnail from "./pages/YoutubeThumbnail";
import BackgroundRemover from "./pages/BackgroundRemover";
import WordToPdf from "./pages/WordToPdf";
import PdfToWord from "./pages/PdfToWord";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/text-to-speech" element={<TextToSpeech />} />
          <Route path="/text-to-binary" element={<TextToBinary />} />
          <Route path="/text-cleaner" element={<TextCleaner />} />
          <Route path="/grammar-checker" element={<GrammarChecker />} />
          <Route path="/text-counter" element={<TextCounter />} />
          <Route path="/youtube-downloader" element={<YoutubeDownloader />} />
          <Route path="/facebook-downloader" element={<FacebookDownloader />} />
          <Route path="/tiktok-downloader" element={<TiktokDownloader />} />
          <Route path="/instagram-downloader" element={<InstagramDownloader />} />
          <Route path="/youtube-thumbnail" element={<YoutubeThumbnail />} />
          <Route path="/background-remover" element={<BackgroundRemover />} />
          <Route path="/word-to-pdf" element={<WordToPdf />} />
          <Route path="/pdf-to-word" element={<PdfToWord />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
