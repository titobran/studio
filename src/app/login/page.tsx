
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Chrome, Facebook, Twitter, Mail, AppWindow } from 'lucide-react';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual login logic
    console.log("Logging in with:", { email, password });
    alert("Login submitted (UI only)");
  };

  const handleSocialLogin = (provider: string) => {
    // TODO: Implement actual social login logic
    console.log(`Attempting to login with ${provider}`);
    alert(`Login with ${provider} (UI only)`);
  };

  return (
    <div className="flex items-center justify-center py-12">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">¡Bienvenido de Nuevo!</CardTitle>
          <CardDescription>Inicia sesión en tu cuenta de MTM.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="tu@ejemplo.com" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              {/* <div className="flex items-center space-x-2">
                <Checkbox id="remember-me" />
                <Label htmlFor="remember-me">Remember me</Label>
              </div> commented out, Checkbox not imported and not requested*/}
              <Link href="#" className="font-medium text-primary hover:underline">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
            <Button type="submit" className="w-full">
              Iniciar Sesión
            </Button>
          </form>
          
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                O inicia sesión con
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <Button variant="outline" onClick={() => handleSocialLogin('Google')}>
              <Chrome className="mr-2 h-4 w-4" /> Iniciar sesión con Google
            </Button>
            <Button variant="outline" onClick={() => handleSocialLogin('Facebook')}>
              <Facebook className="mr-2 h-4 w-4" /> Iniciar sesión con Facebook
            </Button>
            <Button variant="outline" onClick={() => handleSocialLogin('Twitter')}>
              <Twitter className="mr-2 h-4 w-4" /> Iniciar sesión con Twitter (X)
            </Button>
            <Button variant="outline" onClick={() => handleSocialLogin('Microsoft')}>
              <AppWindow className="mr-2 h-4 w-4" /> Iniciar sesión con Microsoft
            </Button>
            <Button variant="outline" onClick={() => handleSocialLogin('Yahoo')}>
              <Mail className="mr-2 h-4 w-4" /> Iniciar sesión con Yahoo
            </Button>
          </div>
        </CardContent>
        <CardFooter className="text-center text-sm">
          <p className="w-full">
            ¿No tienes una cuenta?{' '}
            <Link href="/register" className="font-medium text-primary hover:underline">
              Regístrate
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
