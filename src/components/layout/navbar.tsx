
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Import usePathname
import { Button } from '@/components/ui/button';
import { Turtle, UserCircle, LogOut, Settings, HelpCircle, Megaphone, Gamepad2 } from 'lucide-react';
import { ThemeToggleButton } from '@/components/ui/theme-toggle-button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from 'react';
import LogoClickerGame from '@/components/minigames/logo-clicker-game';

export default function Navbar() {
  const goldButtonClassName = "bg-custom-gold-button-bg text-custom-gold-button-text hover:brightness-[0.95]";
  const [isGameDialogOpen, setIsGameDialogOpen] = useState(false);
  const pathname = usePathname(); // Get the current path

  const isHomePage = pathname === '/';

  const MtmLogoAndText = (
    <>
      <Turtle className="h-5 w-5 text-primary" />
      <span className="font-semibold text-primary">MTM</span>
      <span className="text-sm text-muted-foreground hidden md:block">Tu Portal al Océano Digital</span>
    </>
  );

  return (
    <nav className="w-full border-b border-border shadow-sm sticky top-0 bg-background z-50">
      <div className="container mx-auto flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        {isHomePage ? (
          <Dialog open={isGameDialogOpen} onOpenChange={setIsGameDialogOpen}>
            <DialogTrigger asChild>
              <button
                className="flex items-center space-x-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md p-1"
                aria-label="Abrir minijuego de MTM"
              >
                {MtmLogoAndText}
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[450px]">
              <DialogHeader>
                <DialogTitle className="flex items-center">
                  <Gamepad2 className="mr-2 h-5 w-5" />
                  MiniJuego: ¡Atrapa la Tortuga!
                </DialogTitle>
                <DialogDescription>
                  Haz clic en la tortuga tantas veces como puedas antes de que se acabe el tiempo.
                </DialogDescription>
              </DialogHeader>
              <LogoClickerGame />
              <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Cerrar
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ) : (
          <Link
            href="/"
            className="flex items-center space-x-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md p-1"
            aria-label="Ir a la página principal de MTM"
          >
            {MtmLogoAndText}
          </Link>
        )}

        <div className="flex items-center space-x-1 sm:space-x-2">
          <ThemeToggleButton className={`${goldButtonClassName} rounded-full`} />
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
              <Button size="icon" className={`${goldButtonClassName} rounded-full`}>
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
                  <Megaphone className="mr-2 h-4 w-4" />
                  <span>Novedades</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/logout" className="flex items-center"> {/* Removed text-destructive classes */}
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
