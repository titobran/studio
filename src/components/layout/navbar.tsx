
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Turtle, UserCircle, LogOut, Settings, HelpCircle, Megaphone } from 'lucide-react'; // Replaced Announce with Megaphone
import { ThemeToggleButton } from '@/components/ui/theme-toggle-button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
          <ThemeToggleButton />
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

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <UserCircle className="h-6 w-6" />
                <span className="sr-only">Abrir menú de usuario</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/settings" className="flex items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Configuración</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/help" className="flex items-center">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  <span>Ayuda y Recursos</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/whats-new" className="flex items-center">
                  <Megaphone className="mr-2 h-4 w-4" /> {/* Using Megaphone for Novedades */}
                  <span>Novedades</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                {/* In a real app, this would trigger a logout function */}
                <Link href="/logout" className="flex items-center text-destructive hover:!text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Cerrar Sesión</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

        </div>
      </div>
    </nav>
  );
}
