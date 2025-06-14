
// This is an autogenerated file from Firebase Studio.
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Turtle, Star, Sparkles, VenetianMask, Anchor, LineChart } from 'lucide-react'; // Using VenetianMask for Mantis Shrimp, Anchor for Whale

interface MarineAnimal {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  imageUrl: string;
  dataAiHint: string;
  analyticsPageUrl: string; // Changed from detailsPageUrl
}

const marineAnimals: MarineAnimal[] = [
  {
    id: 'sea-turtles',
    name: 'Tortugas Marinas',
    description: 'Sumérgete en el mundo de estas majestuosas criaturas marinas y su importancia en los ecosistemas oceánicos.',
    icon: Turtle,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'sea turtle',
    analyticsPageUrl: '/species/sea-turtles/analytics', 
  },
  {
    id: 'starfish',
    name: 'Estrellas de Mar',
    description: 'Descubre la increíble diversidad y las fascinantes adaptaciones de estos equinodermos.',
    icon: Star,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'starfish ocean',
    analyticsPageUrl: '/species/starfish/analytics', 
  },
  {
    id: 'corals',
    name: 'Corales',
    description: 'Explora los vibrantes arrecifes de coral, los "bosques tropicales del mar", y su crucial papel ecológico.',
    icon: Sparkles, 
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'coral reef',
    analyticsPageUrl: '/species/corals/analytics', 
  },
  {
    id: 'mantis-shrimp',
    name: 'Camarón Mantis',
    description: 'Conoce al camarón mantis, famoso por su poderosa pegada y su compleja visión.',
    icon: VenetianMask, 
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'mantis shrimp',
    analyticsPageUrl: '/species/mantis-shrimp/analytics', 
  },
  {
    id: 'whales',
    name: 'Ballenas',
    description: 'Aprende sobre los gigantes del océano, desde la ballena azul hasta las juguetonas jorobadas.',
    icon: Anchor, 
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'whale ocean',
    analyticsPageUrl: '/species/whales/analytics', 
  },
];

export default function SpeciesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <div className="inline-flex items-center justify-center bg-primary/10 p-3 rounded-full mb-4">
          <Turtle className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
          Explora las Especies Marinas
        </h1>
        <p className="mt-3 text-lg text-muted-foreground sm:mt-5 sm:text-xl">
          Descubre la increíble diversidad de vida que habita en nuestros océanos.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {marineAnimals.map((animal, index) => (
          <Card
            key={animal.id}
            className="flex flex-col rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-500 ease-out"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="w-full h-48 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={animal.imageUrl}
                alt={animal.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                data-ai-hint={animal.dataAiHint}
              />
            </div>
            <CardHeader className="p-6">
              <CardTitle className="text-xl font-semibold flex items-center">
                <animal.icon className="h-6 w-6 mr-2 text-primary" />
                {animal.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow p-6 pt-0">
              <CardDescription className="text-sm text-muted-foreground line-clamp-3">
                {animal.description}
              </CardDescription>
            </CardContent>
            <CardFooter className="p-6 bg-muted/30 flex flex-col sm:flex-row gap-2">
              <Button asChild variant="outline" className="w-full sm:flex-1">
                <Link href={`/species/${animal.id}`}>Saber Más</Link> 
              </Button>
              <Button asChild variant="default" className="w-full sm:flex-1">
                <Link href={animal.analyticsPageUrl} className="flex items-center justify-center">
                  <LineChart className="mr-2 h-4 w-4" />
                  Ver Análisis
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-16 text-center">
        <Button asChild variant="link">
          <Link href="/">Volver a la Página Principal</Link>
        </Button>
      </div>
    </div>
  );
}

