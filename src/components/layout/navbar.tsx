
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Turtle } from 'lucide-react';
import { ThemeToggleButton } from '@/components/ui/theme-toggle-button';

export default function Navbar() {
  const goldButtonClassName = "bg-custom-gold-button-bg text-custom-gold-button-text hover:brightness-[0.95]";

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
          <Button size="sm" asChild className={goldButtonClassName}>
            <span><Link href="/register">Regístrate</Link></span>
          </Button>
          <Button size="sm" asChild className={goldButtonClassName}>
            <span><Link href="/login">Iniciar Sesión</Link></span>
          </Button>
          <Button size="sm" asChild className={goldButtonClassName}>
            <span><Link href="/credits">Créditos</Link></span>
          </Button>
          <Button size="sm" asChild className={goldButtonClassName}>
            <span><Link href="/premium">Premium</Link></span>
          </Button>
        </div>
      </div>
    </nav>
  );
}
