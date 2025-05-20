
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Fish } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="w-full border-b border-border shadow-sm sticky top-0 bg-background z-50">
      <div className="container mx-auto flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2">
          <Fish className="h-5 w-5 text-primary" />
          <Link href="/" className="font-semibold text-primary">
            MTM
          </Link>
          <span className="text-sm text-muted-foreground hidden md:block">Your Gateway to the Digital Ocean</span>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-3">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/register">Register</Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href="/login">Log In</Link>
          </Button>
          <Button variant="ghost" size="sm">
            Credits
          </Button>
          <Button variant="default" size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            Premium
          </Button>
        </div>
      </div>
    </nav>
  );
}
