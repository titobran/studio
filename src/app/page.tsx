
"use client";

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Turtle, Newspaper, FlaskConical, Quote, MessageSquarePlus } from 'lucide-react'; 

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
    icon: Turtle, 
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
  return (
    <div className="flex flex-col items-center justify-center selection:bg-primary/20 selection:text-primary pt-8 sm:pt-12">
      <div className="w-full max-w-2xl space-y-8">
        <header className="text-center">
          <div className="inline-flex items-center gap-3 mb-4 text-primary">
            <Turtle className="h-10 w-10 sm:h-12 sm:w-12" />
            <h1 className="text-4xl sm:text-5xl font-bold">MTM</h1>
          </div>
          <p className="text-muted-foreground text-md sm:text-lg">
            Tu Portal al Océano Digital
          </p>
        </header>
      </div>

      {/* Content Sections */}
      <div className="w-full max-w-5xl mt-16 space-y-12">
        <header className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Explora el Mundo Marino
          </h2>
          <p className="mt-2 text-lg text-muted-foreground">
            Descubre más sobre nuestros océanos y cómo puedes contribuir.
          </p>
        </header>
        <div className="grid gap-8 md:grid-cols-2">
          {contentSections.map((section, index) => (
            <Card 
              key={section.id} 
              className="shadow-lg rounded-xl overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-5 duration-500 ease-out"
              style={{ animationDelay: `${index * 100}ms` }}
            >
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
                  <Link href={section.href}>Saber Más</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* User Reviews Call to Action Section */}
      <div className="w-full max-w-5xl mt-16 mb-12 space-y-8">
        <header className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl flex items-center justify-center">
            <Quote className="h-8 w-8 mr-3 transform -scale-x-100" />
            ¡Valora Tu Experiencia!
            <Quote className="h-8 w-8 ml-3" />
          </h2>
          <p className="mt-2 text-lg text-muted-foreground">
            Nos encantaría conocer tu opinión. Ayúdanos a mejorar MTM.
          </p>
        </header>
        <div className="text-center mt-8">
          <Button asChild variant="default" size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="/reviews" className="flex items-center">
              <MessageSquarePlus className="mr-2 h-5 w-5" />
              Escribe o Lee Reseñas
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
