
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import { Play, Pause, Square } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const TextToSpeech = () => {
  const [text, setText] = useState("");
  const [rate, setRate] = useState([1]);
  const [pitch, setPitch] = useState([1]);
  const [voice, setVoice] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);

  const voices = speechSynthesis.getVoices();

  const handleSpeak = () => {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
    }

    if (text.trim() === "") {
      toast({
        title: "Error",
        description: "Please enter some text to convert to speech.",
        variant: "destructive",
      });
      return;
    }

    const newUtterance = new SpeechSynthesisUtterance(text);
    newUtterance.rate = rate[0];
    newUtterance.pitch = pitch[0];
    
    if (voice) {
      const selectedVoice = voices.find(v => v.name === voice);
      if (selectedVoice) {
        newUtterance.voice = selectedVoice;
      }
    }

    newUtterance.onstart = () => setIsPlaying(true);
    newUtterance.onend = () => setIsPlaying(false);
    newUtterance.onerror = () => {
      setIsPlaying(false);
      toast({
        title: "Error",
        description: "Failed to convert text to speech.",
        variant: "destructive",
      });
    };

    setUtterance(newUtterance);
    speechSynthesis.speak(newUtterance);
  };

  const handlePause = () => {
    speechSynthesis.pause();
    setIsPlaying(false);
  };

  const handleResume = () => {
    speechSynthesis.resume();
    setIsPlaying(true);
  };

  const handleStop = () => {
    speechSynthesis.cancel();
    setIsPlaying(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <div className="flex-1 py-8 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">Text to Speech Converter</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Enter your text</label>
                <Textarea
                  placeholder="Type or paste your text here..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="min-h-[200px]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Voice</label>
                  <Select value={voice} onValueChange={setVoice}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a voice" />
                    </SelectTrigger>
                    <SelectContent>
                      {voices.map((v, index) => (
                        <SelectItem key={index} value={v.name}>
                          {v.name} ({v.lang})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Speech Rate: {rate[0]}</label>
                  <Slider
                    value={rate}
                    onValueChange={setRate}
                    max={2}
                    min={0.1}
                    step={0.1}
                    className="w-full"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="text-sm font-medium mb-2 block">Pitch: {pitch[0]}</label>
                  <Slider
                    value={pitch}
                    onValueChange={setPitch}
                    max={2}
                    min={0}
                    step={0.1}
                    className="w-full"
                  />
                </div>
              </div>

              <div className="flex justify-center gap-4">
                <Button onClick={handleSpeak} disabled={isPlaying}>
                  <Play className="w-4 h-4 mr-2" />
                  Speak
                </Button>
                
                <Button onClick={handlePause} disabled={!isPlaying} variant="outline">
                  <Pause className="w-4 h-4 mr-2" />
                  Pause
                </Button>
                
                <Button onClick={handleResume} disabled={!speechSynthesis.paused} variant="outline">
                  <Play className="w-4 h-4 mr-2" />
                  Resume
                </Button>
                
                <Button onClick={handleStop} disabled={!isPlaying} variant="destructive">
                  <Square className="w-4 h-4 mr-2" />
                  Stop
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TextToSpeech;
