
"use client";

import { useState, FormEvent, useEffect } from 'react'; // Removed FormEvent as handleTranslate is removed
import Link from 'next/link';
// Removed translateAndDisplay and collectTranslationFeedback imports as they are no longer used
// import { translateAndDisplay } from '@/ai/flows/translate-and-display';
// import type { TranslateAndDisplayInput, TranslateAndDisplayOutput } from '@/ai/flows/translate-and-display';
// import { collectTranslationFeedback } from '@/ai/flows/collect-translation-feedback';
// import type { CollectTranslationFeedbackInput } from '@/ai/flows/collect-translation-feedback';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// import { Textarea } from '@/components/ui/textarea'; // Removed as no longer used
// import { useToast } from '@/hooks/use-toast'; // Removed as no longer used
import { Fish, Leaf, Newspaper, ShoppingBag, FlaskConical } from 'lucide-react'; // Removed ThumbsUp, ThumbsDown, Loader2

interface ContentSection {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  href: string;
  imgPlaceholder?: string;
  dataAiHint?: string;
}

const contentSections: ContentSection[] = [
  {
    id: 'species',
    title: 'Especies Marinas',
    description: 'Descubre la diversidad de la vida en nuestros océanos, desde el plancton microscópico hasta las ballenas gigantes.',
    icon: Leaf,
    href: '/species',
    imgPlaceholder: 'https://placehold.co/600x400.png',
    dataAiHint: 'coral reef',
  },
  {
    id: 'news',
    title: 'Noticias del Océano',
    description: 'Mantente al día con los últimos descubrimientos, esfuerzos de conservación y eventos relacionados con el mundo marino.',
    icon: Newspaper,
    href: '/news',
    imgPlaceholder: 'https://placehold.co/600x400.png',
    dataAiHint: 'ocean waves',
  },
  {
    id: 'products',
    title: 'Productos Sostenibles',
    description: 'Explora productos y servicios que apoyan la salud de los océanos y promueven prácticas sostenibles.',
    icon: ShoppingBag,
    href: '/products',
    imgPlaceholder: 'https://placehold.co/600x400.png',
    dataAiHint: 'eco friendly',
  },
  {
    id: 'research',
    title: 'Estudios Científicos',
    description: 'Sumérgete en investigaciones y estudios científicos sobre oceanografía, biología marina y cambio climático.',
    icon: FlaskConical,
    href: '/research',
    imgPlaceholder: 'https://placehold.co/600x400.png',
    dataAiHint: 'science laboratory',
  },
];

export default function MTMPage() {
  // Removed state variables related to the translator
  // const [phrase, setPhrase] = useState<string>('');
  // const [originalPhrase, setOriginalPhrase] = useState<string>('');
  // const [translation, setTranslation] = useState<string>('');
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [error, setError] = useState<string | null>(null);
  // const [feedbackState, setFeedbackState] = useState<'up' | 'down' | null>(null);
  // const [isFeedbackSubmitting, setIsFeedbackSubmitting] = useState<boolean>(false);

  // const { toast } = useToast(); // Removed as toasts are no longer used here

  // Removed handleTranslate and handleFeedback functions

  return (
    <div className="flex flex-col items-center justify-center selection:bg-primary/20 selection:text-primary pt-8 sm:pt-12">
      <div className="w-full max-w-2xl space-y-8">
        <header className="text-center">
          <div className="inline-flex items-center gap-3 mb-4 text-primary">
            <Fish className="h-10 w-10 sm:h-12 sm:w-12" />
            <h1 className="text-4xl sm:text-5xl font-bold">MTM</h1>
          </div>
          <p className="text-muted-foreground text-md sm:text-lg">
            Your Gateway to the Digital Ocean {/* Updated motto, or can be more generic if translator is gone */}
          </p>
        </header>

        {/* Translator Card Section Removed */}
        {/* 
        <Card className="shadow-lg rounded-xl overflow-hidden">
          ...
        </Card>
        */}

        {/* Translation Display Card Section Removed */}
        {/* 
        {(translation || isLoading || error) && (
          <Card className="shadow-lg rounded-xl overflow-hidden">
            ...
          </Card>
        )}
        */}
      </div>

      {/* Content Sections */}
      <div className="w-full max-w-5xl mt-16 space-y-12">
        <header className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Explore the Marine World
          </h2>
          <p className="mt-2 text-lg text-muted-foreground">
            Discover more about our oceans and how you can contribute.
          </p>
        </header>
        <div className="grid gap-8 md:grid-cols-2">
          {contentSections.map((section) => (
            <Card key={section.id} className="shadow-lg rounded-xl overflow-hidden flex flex-col">
              {section.imgPlaceholder && (
                // eslint-disable-next-line @next/next/no-img-element
                <img 
                  src={section.imgPlaceholder} 
                  alt={section.title} 
                  className="w-full h-48 object-cover"
                  data-ai-hint={section.dataAiHint || "ocean"}
                />
              )}
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl flex items-center">
                  <section.icon className="h-6 w-6 mr-2 text-primary" />
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground">{section.description}</p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full sm:w-auto">
                  <Link href={section.href}>Learn More</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
