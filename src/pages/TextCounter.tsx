
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/Header";

const TextCounter = () => {
  const [text, setText] = useState("");
  const [stats, setStats] = useState({
    characters: 0,
    charactersNoSpaces: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0,
    uppercase: 0,
    lowercase: 0,
    numbers: 0,
  });

  useEffect(() => {
    const calculateStats = () => {
      const characters = text.length;
      const charactersNoSpaces = text.replace(/\s/g, "").length;
      const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
      const sentences = text.trim() === "" ? 0 : text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
      const paragraphs = text.trim() === "" ? 0 : text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length;
      const uppercase = (text.match(/[A-Z]/g) || []).length;
      const lowercase = (text.match(/[a-z]/g) || []).length;
      const numbers = (text.match(/[0-9]/g) || []).length;

      setStats({
        characters,
        charactersNoSpaces,
        words,
        sentences,
        paragraphs,
        uppercase,
        lowercase,
        numbers,
      });
    };

    calculateStats();
  }, [text]);

  const StatCard = ({ title, value, description }: { title: string; value: number; description: string }) => (
    <Card>
      <CardContent className="pt-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">{value.toLocaleString()}</div>
          <div className="text-sm font-medium">{title}</div>
          <div className="text-xs text-muted-foreground mt-1">{description}</div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <div className="flex-1 py-8 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">Text Counter & Analyzer</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <label className="text-sm font-medium mb-2 block">Enter or paste your text</label>
                <Textarea
                  placeholder="Start typing or paste your text here to see real-time statistics..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="min-h-[300px]"
                />
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              title="Characters"
              value={stats.characters}
              description="Including spaces"
            />
            <StatCard
              title="Characters"
              value={stats.charactersNoSpaces}
              description="Excluding spaces"
            />
            <StatCard
              title="Words"
              value={stats.words}
              description="Separated by spaces"
            />
            <StatCard
              title="Sentences"
              value={stats.sentences}
              description="Ending with . ! ?"
            />
            <StatCard
              title="Paragraphs"
              value={stats.paragraphs}
              description="Separated by blank lines"
            />
            <StatCard
              title="Uppercase"
              value={stats.uppercase}
              description="Capital letters A-Z"
            />
            <StatCard
              title="Lowercase"
              value={stats.lowercase}
              description="Small letters a-z"
            />
            <StatCard
              title="Numbers"
              value={stats.numbers}
              description="Digits 0-9"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextCounter;
