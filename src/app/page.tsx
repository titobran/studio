
"use client";

import { useState, useEffect } from 'react'; // useEffect might not be needed anymore if no async ops on mount
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Turtle, Newspaper, ShoppingBag, FlaskConical, Star, Quote } from 'lucide-react'; 

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
  // Removed "reviews" from here, it will be an inline section
];

interface FeaturedReview {
  id: string;
  userName: string;
  userAvatarUrl: string;
  dataAiHintAvatar: string;
  rating: number;
  reviewText: string;
  reviewDate: string; // Kept for potential future use, though not displayed in compact view
}

const featuredReviews: FeaturedReview[] = [
  {
    id: 'review1',
    userName: 'Explorador@ Marín@',
    userAvatarUrl: 'https://placehold.co/100x100.png',
    dataAiHintAvatar: 'diver avatar',
    rating: 5,
    reviewText: '¡MTM es increíble! He aprendido muchísimo sobre la vida marina y los esfuerzos de conservación. La sección de noticias siempre está actualizada.',
    reviewDate: '15 de Abril, 2025',
  },
  {
    id: 'review3',
    userName: 'Amante del Océano',
    userAvatarUrl: 'https://placehold.co/100x100.png',
    dataAiHintAvatar: 'ocean lover',
    rating: 5,
    reviewText: 'Me encantan los productos sostenibles que se muestran. ¡Ya he comprado varios! Es genial encontrar un lugar que promueva la conciencia oceánica de esta manera.',
    reviewDate: '10 de Mayo, 2025',
  },
   {
    id: 'review2',
    userName: 'Científic@ Curios@',
    userAvatarUrl: 'https://placehold.co/100x100.png',
    dataAiHintAvatar: 'scientist avatar',
    rating: 4,
    reviewText: 'Una plataforma muy completa y bien diseñada. Los artículos de investigación son fascinantes y fáciles de entender. Me gustaría ver más interactividad.',
    reviewDate: '22 de Marzo, 2025',
  },
];

const renderStars = (rating: number) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground/30'}`}
      />
    );
  }
  return <div className="flex items-center">{stars}</div>;
};


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

      {/* Featured Reviews Section */}
      <div className="w-full max-w-5xl mt-16 mb-12 space-y-8">
        <header className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl flex items-center justify-center">
            <Quote className="h-8 w-8 mr-3 transform -scale-x-100" />
            Lo que dicen nuestros usuarios
            <Quote className="h-8 w-8 ml-3" />
          </h2>
          <p className="mt-2 text-lg text-muted-foreground">
            Opiniones de nuestra comunidad sobre MTM.
          </p>
        </header>
        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
          {featuredReviews.map((review, index) => (
            <Card 
              key={review.id} 
              className="shadow-lg rounded-xl overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-5 duration-500 ease-out"
              style={{ animationDelay: `${(contentSections.length + index) * 100}ms` }}
            >
              <CardHeader className="flex flex-row items-center gap-4 p-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={review.userAvatarUrl} alt={review.userName} data-ai-hint={review.dataAiHintAvatar} />
                  <AvatarFallback>{review.userName.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-md font-semibold">{review.userName}</CardTitle>
                  {renderStars(review.rating)}
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0 text-sm text-muted-foreground flex-grow">
                <p className="italic line-clamp-4">&quot;{review.reviewText}&quot;</p>
              </CardContent>
              {/* Footer could be added if needed, e.g. review.reviewDate */}
            </Card>
          ))}
        </div>
        <div className="text-center mt-8">
          <Button asChild variant="outline" size="lg">
            <Link href="/reviews">Ver todas las opiniones</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
