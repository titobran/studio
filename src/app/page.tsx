
"use client";

import { useState, FormEvent } from 'react';
import { translateAndDisplay } from '@/ai/flows/translate-and-display';
import type { TranslateAndDisplayInput, TranslateAndDisplayOutput } from '@/ai/flows/translate-and-display';
import { collectTranslationFeedback } from '@/ai/flows/collect-translation-feedback';
import type { CollectTranslationFeedbackInput } from '@/ai/flows/collect-translation-feedback';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Fish, ThumbsUp, ThumbsDown, Loader2 } from 'lucide-react';

export default function MTMPage() {
  const [phrase, setPhrase] = useState<string>('');
  const [originalPhrase, setOriginalPhrase] = useState<string>('');
  const [translation, setTranslation] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const [feedbackState, setFeedbackState] = useState<'up' | 'down' | null>(null);
  const [isFeedbackSubmitting, setIsFeedbackSubmitting] = useState<boolean>(false);

  const { toast } = useToast();

  const handleTranslate = async (event?: FormEvent<HTMLFormElement>) => {
    if (event) event.preventDefault();
    if (!phrase.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter a phrase to translate.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setError(null);
    setTranslation('');
    setFeedbackState(null); 
    setOriginalPhrase(phrase); 

    try {
      const input: TranslateAndDisplayInput = { phrase };
      const result: TranslateAndDisplayOutput = await translateAndDisplay(input);
      if (result.englishTranslation) {
        setTranslation(result.englishTranslation);
      } else {
        setTranslation("No translation found or phrase was empty.");
      }
    } catch (e) {
      console.error("Translation error:", e);
      setError("Failed to translate the phrase. Please try again.");
      toast({
        title: "Translation Error",
        description: "Could not translate the phrase. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFeedback = async (feedback: 'thumbs_up' | 'thumbs_down') => {
    if (!originalPhrase || !translation || feedbackState !== null) return;

    setIsFeedbackSubmitting(true);
    try {
      const input: CollectTranslationFeedbackInput = {
        originalText: originalPhrase,
        translatedText: translation,
        feedback: feedback,
      };
      await collectTranslationFeedback(input);
      setFeedbackState(feedback);
      toast({
        title: "Feedback Submitted",
        description: "Thank you for your feedback!",
      });
    } catch (e) {
      console.error("Feedback submission error:", e);
      toast({
        title: "Feedback Error",
        description: "Could not submit feedback. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsFeedbackSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/20 selection:text-primary">
      <nav className="w-full border-b border-border shadow-sm sticky top-0 bg-background z-50">
        <div className="container mx-auto flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2">
            <Fish className="h-5 w-5 text-primary" />
            <span className="text-sm text-muted-foreground">Your Gateway to the Digital Ocean</span>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm">
              Register
            </Button>
            <Button variant="outline" size="sm">
              Log In
            </Button>
            <Button variant="ghost" size="sm">
              Credits
            </Button>
            <Button variant="default" size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Premium
            </Button>
          </div>
        </div>
      </nav>

      <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-2xl space-y-8">
          <header className="text-center">
            <div className="inline-flex items-center gap-3 mb-4 text-primary">
              <Fish className="h-10 w-10 sm:h-12 sm:w-12" />
              <h1 className="text-4xl sm:text-5xl font-bold">MTM</h1>
            </div>
            <p className="text-muted-foreground text-md sm:text-lg">
              Your Universal Language Translator
            </p>
          </header>

          <Card className="shadow-lg rounded-xl overflow-hidden">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl">Enter Phrase to Translate</CardTitle>
              <CardDescription>
                Type or paste any phrase, and we'll translate it into English for you.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleTranslate}>
                <Textarea
                  value={phrase}
                  onChange={(e) => setPhrase(e.target.value)}
                  placeholder="E.g., Hola Mundo, Bonjour le monde, Hallo Welt..."
                  className="min-h-[100px] text-base focus:ring-accent"
                  disabled={isLoading}
                  aria-label="Phrase to translate"
                />
                <Button type="submit" className="mt-4 w-full text-lg py-6" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Translating...
                    </>
                  ) : (
                    "Translate"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {(translation || isLoading || error) && (
            <Card className="shadow-lg rounded-xl overflow-hidden">
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl">English Translation</CardTitle>
              </CardHeader>
              <CardContent className="min-h-[80px] text-foreground">
                {isLoading && !translation && (
                  <div className="flex items-center justify-center text-muted-foreground">
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    <p>Translating your phrase...</p>
                  </div>
                )}
                {error && <p className="text-destructive text-center">{error}</p>}
                {translation && !error && <p className="text-lg sm:text-xl p-2 bg-secondary/50 rounded-md">{translation}</p>}
                {!isLoading && !translation && !error && (
                  <p className="text-muted-foreground text-center">Translation will appear here once you submit a phrase.</p>
                )}
              </CardContent>
              {translation && !error && (
                <CardFooter className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 border-t pt-6">
                  <p className="text-sm text-muted-foreground">Was this translation helpful?</p>
                  <div className="flex space-x-3">
                    <Button
                      variant={feedbackState === 'up' ? 'default' : 'outline'}
                      size="lg"
                      onClick={() => handleFeedback('thumbs_up')}
                      disabled={isFeedbackSubmitting || feedbackState !== null}
                      aria-label="Helpful translation"
                      className={`transition-all duration-150 ease-in-out transform hover:scale-105 ${feedbackState === 'up' ? 'bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2' : 'hover:bg-primary/10'}`}
                    >
                      <ThumbsUp className="h-5 w-5 mr-2" /> Good
                    </Button>
                    <Button
                      variant={feedbackState === 'down' ? 'destructive' : 'outline'}
                      size="lg"
                      onClick={() => handleFeedback('thumbs_down')}
                      disabled={isFeedbackSubmitting || feedbackState !== null}
                      aria-label="Not helpful translation"
                       className={`transition-all duration-150 ease-in-out transform hover:scale-105 ${feedbackState === 'down' ? 'bg-destructive text-destructive-foreground ring-2 ring-destructive ring-offset-2' : 'hover:bg-destructive/10'}`}
                    >
                      <ThumbsDown className="h-5 w-5 mr-2" /> Bad
                    </Button>
                  </div>
                </CardFooter>
              )}
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
