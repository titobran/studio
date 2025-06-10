
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, Image as ImageIcon, HelpCircle, BarChart3 } from 'lucide-react';

// Datos de ejemplo para las especies de tortugas (para obtener el nombre)
const seaTurtleSpeciesData = [
  { id: 'loggerhead', name: 'Tortuga Caguama', scientificName: 'Caretta caretta' },
  { id: 'green', name: 'Tortuga Verde', scientificName: 'Chelonia mydas' },
  { id: 'leatherback', name: 'Tortuga Laúd', scientificName: 'Dermochelys coriacea' },
  { id: 'hawksbill', name: 'Tortuga Carey', scientificName: 'Eretmochelys imbricata' },
  { id: 'kemps-ridley', name: 'Tortuga Lora', scientificName: 'Lepidochelys kempii' },
  { id: 'olive-ridley', name: 'Tortuga Golfina', scientificName: 'Lepidochelys olivacea' },
];

export default function TurtleDetailsPage() {
  const params = useParams();
  const turtleIdParam = params.turtleDetailsId;
  
  const turtleId = Array.isArray(turtleIdParam) ? turtleIdParam[0] : turtleIdParam;

  if (!turtleId || typeof turtleId !== 'string') {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-destructive">Error</h1>
        <p className="text-muted-foreground">No se pudo determinar el ID de la tortuga desde la URL.</p>
        <Button asChild variant="link" className="mt-4">
          <Link href="/species/sea-turtles">Volver a Tortugas Marinas</Link>
        </Button>
      </div>
    );
  }

  const foundTurtle = seaTurtleSpeciesData.find(t => t.id === turtleId);

  const turtleInfo = foundTurtle || {
    id: turtleId,
    name: turtleId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    scientificName: "N/A (Especie no documentada en nuestros datos)",
  };

  return (
    <div className="container mx-auto px-4 py-12 space-y-12">
      <div className="flex justify-between items-center">
        <Button asChild variant="outline" size="sm">
          <Link href="/species/sea-turtles">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a Tortugas Marinas
          </Link>
        </Button>
      </div>

      <header className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
          {turtleInfo.name}
        </h1>
        <p className="mt-2 text-lg italic text-muted-foreground">
          {turtleInfo.scientificName}
        </p>
      </header>

      <Card className="shadow-xl rounded-xl overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center"><ImageIcon className="mr-2 h-6 w-6 text-primary" /> Imagen Destacada</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full h-96 relative rounded-md overflow-hidden bg-muted">
            <Image
              src={`https://placehold.co/800x600.png?text=${turtleInfo.name ? turtleInfo.name.replace(/\s/g, '+') : 'Imagen'}`}
              alt={`Imagen destacada de ${turtleInfo.name || 'tortuga'}`}
              layout="fill"
              objectFit="cover"
              data-ai-hint={`${turtleInfo.id || 'unknown'} turtle underwater`}
            />
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2 text-primary">Galería de Imágenes</h3>
            <p className="text-muted-foreground text-sm">(Próximamente: más imágenes aquí)</p>
            <div className="grid grid-cols-3 gap-4 mt-2">
              {[1,2,3].map(i => (
                <div key={i} className="w-full h-32 bg-muted rounded flex items-center justify-center text-muted-foreground text-xs">
                  Imagen {i}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-xl rounded-xl overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="mr-2 h-6 w-6 text-primary" />
            Datos Graficados
          </CardTitle>
          <CardDescription>
            Visualizaciones de datos que se añadirán próximamente para {turtleInfo.name}.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-primary mb-1">Crecimiento</h3>
            <p className="text-sm text-muted-foreground font-medium mb-2">Cómo crece la tortuga a lo largo de los años.</p>
            <div className="p-4 bg-muted rounded-md text-center text-muted-foreground text-sm">
              (Aquí se mostrará un gráfico de dispersión en el futuro)
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-primary mb-1">Supervivencia de Crías</h3>
            <p className="text-sm text-muted-foreground font-medium mb-2">Cuántas crías llegan al mar en distintas playas.</p>
            <div className="p-4 bg-muted rounded-md text-center text-muted-foreground text-sm">
              (Aquí se mostrará un gráfico de líneas en el futuro)
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-primary mb-1">Amenazas Principales</h3>
            <p className="text-sm text-muted-foreground font-medium mb-2">Porcentaje de muertes por redes de pesca, contaminación, caza, etc.</p>
            <div className="p-4 bg-muted rounded-md text-center text-muted-foreground text-sm">
              (Aquí se mostrará un gráfico de pastel en el futuro)
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-xl rounded-xl overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center">
            <HelpCircle className="mr-2 h-5 w-5 text-muted-foreground" /> Más Información Próximamente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Estamos trabajando para añadir más detalles y datos interesantes sobre {turtleInfo.name}. ¡Vuelve pronto!
          </p>
        </CardContent>
      </Card>

      <div className="mt-16 text-center">
        <Button asChild variant="link">
          <Link href="/">Volver a la Página Principal</Link>
        </Button>
      </div>
    </div>
  );
}
