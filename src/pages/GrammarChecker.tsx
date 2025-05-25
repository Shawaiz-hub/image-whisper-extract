
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/Header";
import { CheckCircle } from "lucide-react";

const GrammarChecker = () => {
  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const checkGrammar = () => {
    // This is a placeholder - in a real implementation, you would integrate with a grammar checking API
    setSuggestions([
      "Consider replacing 'good' with 'excellent' for better impact",
      "Check subject-verb agreement in sentence 2",
      "Consider adding a comma after 'however'"
    ]);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <div className="flex-1 py-8 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">Grammar Checker</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Enter your text</label>
                <Textarea
                  placeholder="Paste your text here to check for grammar and spelling errors..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="min-h-[200px]"
                />
              </div>

              <Button onClick={checkGrammar} className="w-full">
                <CheckCircle className="w-4 h-4 mr-2" />
                Check Grammar
              </Button>

              {suggestions.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Suggestions:</h3>
                  <ul className="space-y-2">
                    {suggestions.map((suggestion, index) => (
                      <li key={index} className="p-3 bg-muted rounded-lg">
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="text-center text-sm text-muted-foreground">
                <p>Note: This is a demo version. For production use, integrate with grammar checking APIs like Grammarly or LanguageTool.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GrammarChecker;
