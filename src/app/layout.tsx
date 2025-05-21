
import type {Metadata} from 'next';
// import Link from 'next/link'; // Link is not used directly here
import {Geist, Geist_Mono} from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import Navbar from '@/components/layout/navbar';
import { ThemeProvider } from '@/components/theme-provider';
import Image from 'next/image'; // Import next/image

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'MTM',
  description: 'Explora el mundo marino y descubre sus maravillas.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative min-h-screen"> {/* Wrapper for positioning context if needed */}
            
            {/* Background Image Layer - Fixed to viewport, behind all content */}
            <div className="fixed inset-0 -z-10"> 
              <Image
                src="https://lh3.googleusercontent.com/gg-dl/AJfQ9KSQkuMU9RbHO3SPDKNlJOEShpr93nLCO6aZsYSEFow7OLG2i5W5WudauCdAkwL2lQl07_66s3USr3LzSLXxJARiM3snec2hxoogFKxXBit_58JRK26atdCEGPkcoQno5d1CTm3tgdkPJeD5P-DPfTsysZiA5Fp6KhiJOqsq5qhUWj4Q5A" 
                alt="Fondo marino"
                layout="fill"
                objectFit="cover"
                className="opacity-30" // Adjust opacity for desired subtlety
                data-ai-hint="octopus starfish" 
                priority 
              />
            </div>

            {/* Main Content Structure */}
            {/* This div will allow the fixed background image to show through. */}
            {/* The theme's --background is still available for components like Cards. */}
            <div className="flex flex-col min-h-screen text-foreground"> {/* Removed bg-background */}
              <Navbar /> {/* Navbar has z-50, so it's on top */}
              <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
              </main>
            </div>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
