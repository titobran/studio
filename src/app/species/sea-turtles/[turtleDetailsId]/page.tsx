
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, Image as ImageIcon, BarChart2, ScatterChart as ScatterChartIcon, HelpCircle } from 'lucide-react';
import { ChartContainer, ChartTooltipContent, ChartLegend } from "@/components/ui/chart";
import type { ChartConfig } from "@/components/ui/chart";
import { BarChart, Bar, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend as RechartsLegend, ResponsiveContainer, LabelList, Cell } from 'recharts';

// Datos de ejemplo para las especies de tortugas (para obtener el nombre)
const seaTurtleSpeciesData = [
  { id: 'loggerhead', name: 'Tortuga Caguama', scientificName: 'Caretta caretta' },
  { id: 'green', name: 'Tortuga Verde', scientificName: 'Chelonia mydas' },
  { id: 'leatherback', name: 'Tortuga Laúd', scientificName: 'Dermochelys coriacea' },
  { id: 'hawksbill', name: 'Tortuga Carey', scientificName: 'Eretmochelys imbricata' },
  { id: 'kemps-ridley', name: 'Tortuga Lora', scientificName: 'Lepidochelys kempii' },
  { id: 'olive-ridley', name: 'Tortuga Golfina', scientificName: 'Lepidochelys olivacea' },
];

// Datos de ejemplo para gráficos
const sizeVsAgeData = [
  { age: 1, length: 20, weight: 1 }, { age: 5, length: 40, weight: 10 },
  { age: 10, length: 60, weight: 50 }, { age: 15, length: 75, weight: 100 },
  { age: 20, length: 90, weight: 150 }, { age: 25, length: 100, weight: 200 },
  { age: 30, length: 105, weight: 220 }, { age: 35, length: 110, weight: 230 },
];

const averageWeightData = [
  { id: 'green', name: "T. Verde", weight: 150 },
  { id: 'leatherback', name: "T. Laúd", weight: 400 },
  { id: 'hawksbill', name: "T. Carey", weight: 60 },
  { id: 'loggerhead', name: "T. Caguama", weight: 135 },
  { id: 'kemps-ridley', name: "T. Lora", weight: 45 },
  { id: 'olive-ridley', name: "T. Golfina", weight: 45 },
];

const chartConfigSizeVsAge: ChartConfig = {
  length: { label: "Longitud (cm)", color: "hsl(var(--primary))" },
};

// Config para el gráfico de peso promedio. El color general es accent, pero se anulará por celda.
const chartConfigAvgWeight: ChartConfig = {
  weight: { label: "Peso Promedio (kg)", color: "hsl(var(--accent))" },
   // Podríamos añadir un color primario para la leyenda si quisiéramos diferenciarlo
  currentWeight: { label: "Peso Promedio (kg) - Actual", color: "hsl(var(--primary))" },
};


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

  // Modificamos los datos para el gráfico de peso promedio para la leyenda
  const processedAverageWeightData = averageWeightData.map(item => ({
    ...item,
    // Usamos diferentes dataKeys para la leyenda si es necesario
    // Esto es más para control de leyenda si se requiere mostrar "Actual" vs "Otros"
    // Para el color de la barra, Cell es suficiente.
  }));


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
            <BarChart2 className="mr-2 h-6 w-6 text-primary" /> Datos Graficados
          </CardTitle>
          <CardDescription>Visualizaciones de datos relevantes para {turtleInfo.name}. (Datos de ejemplo)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <ScatterChartIcon className="mr-2 h-5 w-5 text-primary" />Crecimiento: Tamaño vs Edad
              </CardTitle>
              <CardDescription>Relación entre la edad (años) y la longitud del caparazón (cm) para {turtleInfo.name}.</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfigSizeVsAge} className="h-[350px] w-full">
                <ResponsiveContainer>
                  <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" dataKey="age" name="Edad (años)" unit=" años" stroke="hsl(var(--muted-foreground))" />
                    <YAxis type="number" dataKey="length" name="Longitud (cm)" unit=" cm" stroke="hsl(var(--muted-foreground))" />
                    <RechartsTooltip 
                      cursor={{ strokeDasharray: '3 3' }} 
                      content={<ChartTooltipContent indicator="dot" />}
                    />
                    <RechartsLegend content={<ChartLegend />} />
                    <Scatter name="Longitud" data={sizeVsAgeData} fill="var(--color-length)" />
                  </ScatterChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <BarChart2 className="mr-2 h-5 w-5 text-primary" />Peso Promedio por Especie
              </CardTitle>
              <CardDescription>Comparación del peso promedio (kg) entre diferentes especies de tortugas marinas. La especie actual ({turtleInfo.name}) está resaltada.</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfigAvgWeight} className="h-[350px] w-full">
                <ResponsiveContainer>
                  <BarChart data={processedAverageWeightData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                    <YAxis unit=" kg" stroke="hsl(var(--muted-foreground))" />
                    <RechartsTooltip 
                      cursor={{ fill: 'hsl(var(--muted)/0.3)' }}
                      content={<ChartTooltipContent />} 
                    />
                    {/* La leyenda puede necesitar ajustes si queremos diferenciar explícitamente "actual" vs "otras" */}
                    <RechartsLegend content={<ChartLegend />} /> 
                    <Bar dataKey="weight" radius={[4, 4, 0, 0]}>
                       <LabelList dataKey="weight" position="top" offset={5} fontSize={10} formatter={(value: number) => `${value} kg`} />
                       {
                        averageWeightData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.id === turtleId ? "hsl(var(--primary))" : "hsl(var(--accent))"} 
                            />
                        ))
                       }
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

           <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <HelpCircle className="mr-2 h-5 w-5 text-muted-foreground" />Más Gráficos Próximamente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Estamos trabajando para añadir más visualizaciones de datos sobre esperanza de vida, reproducción, hábitat y conservación. ¡Vuelve pronto!
              </p>
            </CardContent>
          </Card>

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

