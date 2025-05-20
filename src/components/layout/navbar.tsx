
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Turtle } from 'lucide-react';
import { ThemeToggleButton } from '@/components/ui/theme-toggle-button'; // Added ThemeToggleButton import

export default function Navbar() {
  return (
    <nav className="w-full border-b border-border shadow-sm sticky top-0 bg-background z-50">
      <div className="container mx-auto flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2">
          <Turtle className="h-5 w-5 text-primary" />
          <Link href="/" className="font-semibold text-primary">
            MTM
          </Link>
          <span className="text-sm text-muted-foreground hidden md:block">Tu Portal al Océano Digital</span>
        </div>
        <div className="flex items-center space-x-1 sm:space-x-2"> {/* Reduced space-x for tighter packing */}
          <ThemeToggleButton /> {/* Added ThemeToggleButton */}
          <Button variant="secondary" size="sm" asChild>
            <Link href="/register">Regístrate</Link>
          </Button>
          <Button variant="default" size="sm" asChild>
            <Link href="/login">Iniciar Sesión</Link>
          </Button>
          <Button variant="link" size="sm" asChild>
            <Link href="/credits">Créditos</Link> {/* Assuming /credits page exists or will be created */}
          </Button>
          <Button variant="default" size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
            <Link href="/premium">Premium</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
