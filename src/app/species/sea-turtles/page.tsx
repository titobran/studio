
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { ArrowLeft, Info, Search, ShieldAlert, Sparkles } from 'lucide-react';

interface SeaTurtleSpecies {
  id: string;
  name: string;
  scientificName: string;
  imageUrl: string;
  dataAiHint: string;
  shortDescription: string;
  conservationStatus: string;
  funFact: string;
}

const seaTurtleSpeciesData: SeaTurtleSpecies[] = [
  {
    id: 'loggerhead',
    name: 'Tortuga Caguama',
    scientificName: 'Caretta caretta',
    imageUrl: 'https://placehold.co/400x300.png',
    dataAiHint: 'loggerhead turtle swimming',
    shortDescription: 'Reconocible por su cabeza grande y fuertes mandíbulas, adaptadas para triturar presas de caparazón duro.',
    conservationStatus: 'En Peligro',
    funFact: 'Pueden vivir hasta 50 años o más en la naturaleza.',
  },
  {
    id: 'green',
    name: 'Tortuga Verde',
    scientificName: 'Chelonia mydas',
    imageUrl: 'https://placehold.co/400x300.png',
    dataAiHint: 'green sea turtle grazing',
    shortDescription: 'Principalmente herbívora en su etapa adulta, se alimenta de pastos marinos y algas.',
    conservationStatus: 'En Peligro',
    funFact: 'Su grasa corporal es de color verdoso, de ahí su nombre.',
  },
  {
    id: 'leatherback',
    name: 'Tortuga Laúd',
    scientificName: 'Dermochelys coriacea',
    imageUrl: 'https://placehold.co/400x300.png',
    dataAiHint: 'leatherback turtle deep sea',
    shortDescription: 'La más grande de todas las tortugas marinas, con un caparazón flexible y correoso en lugar de óseo.',
    conservationStatus: 'Vulnerable',
    funFact: 'Puede sumergirse a profundidades de más de 1,000 metros.',
  },
  {
    id: 'hawksbill',
    name: 'Tortuga Carey',
    scientificName: 'Eretmochelys imbricata',
    imageUrl: 'https://placehold.co/400x300.png',
    dataAiHint: 'hawksbill turtle coral',
    shortDescription: 'Identificada por su pico afilado y puntiagudo, similar al de un ave rapaz, que usa para alimentarse de esponjas.',
    conservationStatus: 'En Peligro Crítico',
    funFact: 'Su caparazón tiene un hermoso patrón ambarino, lo que lamentablemente la hizo objetivo de caza.',
  },
  {
    id: 'kemps-ridley',
    name: 'Tortuga Lora',
    scientificName: 'Lepidochelys kempii',
    imageUrl: 'https://placehold.co/400x300.png',
    dataAiHint: 'kemps ridley turtle nesting',
    shortDescription: 'La especie de tortuga marina más pequeña y la que se encuentra en mayor peligro de extinción.',
    conservationStatus: 'En Peligro Crítico',
    funFact: 'Son famosas por sus anidaciones masivas sincronizadas, llamadas "arribadas".',
  },
  {
    id: 'olive-ridley',
    name: 'Tortuga Golfina',
    scientificName: 'Lepidochelys olivacea',
    imageUrl: 'https://placehold.co/400x300.png',
    dataAiHint: 'olive ridley turtle group',
    shortDescription: 'Junto con la Lora, es conocida por sus espectaculares arribadas de anidación.',
    conservationStatus: 'Vulnerable',
    funFact: 'Su nombre proviene del color oliva de su caparazón.',
  },
];

export default function SeaTurtlesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <Button asChild variant="outline" size="sm">
          <Link href="/species">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a Especies
          </Link>
        </Button>
      </div>

      <header className="text-center mb-12">
        <Sparkles className="h-12 w-12 text-primary mx-auto mb-4" />
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
          Diversidad de Tortugas Marinas
        </h1>
        <p className="mt-3 text-lg text-muted-foreground sm:mt-5 sm:text-xl">
          Explora las diferentes especies de tortugas que surcan nuestros océanos. Pasa el mouse sobre una especie para más detalles.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {seaTurtleSpeciesData.map((turtle, index) => (
          <HoverCard key={turtle.id} openDelay={200} closeDelay={100}>
            <Card 
              className="rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-500 ease-out group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <HoverCardTrigger asChild>
                <div className="cursor-pointer">
                  <div className="w-full h-48 relative overflow-hidden">
                    <Image
                      src={turtle.imageUrl}
                      alt={turtle.name}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-300 group-hover:scale-105"
                      data-ai-hint={turtle.dataAiHint}
                    />
                  </div>
                  <CardHeader className="p-4">
                    <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors">
                      {turtle.name}
                    </CardTitle>
                    <CardDescription className="text-sm italic">
                      {turtle.scientificName}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {turtle.shortDescription}
                    </p>
                  </CardContent>
                </div>
              </HoverCardTrigger>
              <HoverCardContent
                side={index % 3 === 2 ? 'left' : 'right'}
                align="center"
                className="w-80 rounded-lg shadow-xl p-5 bg-popover text-popover-foreground"
              >
                <div className="space-y-3">
                  <h3 className="text-md font-semibold text-primary">{turtle.name}</h3>
                  <p className="text-xs italic">{turtle.scientificName}</p>
                  
                  <div className="flex items-start space-x-2 text-xs">
                    <ShieldAlert className="h-4 w-4 mt-0.5 text-destructive flex-shrink-0" />
                    <p><span className="font-medium">Estado:</span> {turtle.conservationStatus}</p>
                  </div>
                  <div className="flex items-start space-x-2 text-xs">
                    <Info className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                     <p><span className="font-medium">Dato Curioso:</span> {turtle.funFact}</p>
                  </div>
                  
                  <Button asChild size="sm" className="w-full mt-3">
                    <Link href={`/species/sea-turtles/${turtle.id}`}>
                      <Search className="mr-2 h-4 w-4" />
                      Indagar Más
                    </Link>
                  </Button>
                </div>
              </HoverCardContent>
            </Card>
          </HoverCard>
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
