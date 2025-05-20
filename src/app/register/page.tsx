
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Chrome, Facebook, Twitter, Mail, AppWindow } from 'lucide-react'; // AppWindow for Microsoft
import { useState } from 'react';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual registration logic
    console.log("Registering with:", { email, password, confirmPassword });
    if (password !== confirmPassword) {
      alert("Passwords do not match!"); // Replace with proper toast/notification
      return;
    }
    alert("Registration submitted (UI only)");
  };

  const handleSocialLogin = (provider: string) => {
    // TODO: Implement actual social login logic
    console.log(`Attempting to register with ${provider}`);
    alert(`Register with ${provider} (UI only)`);
  };

  return (
    <div className="flex items-center justify-center py-12">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Crear una Cuenta</CardTitle>
          <CardDescription>Ingresa tus detalles a continuación para comenzar.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleRegister} className="space-y-4">
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
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirmar Contraseña</Label>
              <Input 
                id="confirm-password" 
                type="password" 
                placeholder="••••••••" 
                required 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full">
              Crear Cuenta
            </Button>
          </form>
          
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                O regístrate con
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <Button variant="outline" onClick={() => handleSocialLogin('Google')}>
              <Chrome className="mr-2 h-4 w-4" /> Registrarse con Google
            </Button>
            <Button variant="outline" onClick={() => handleSocialLogin('Facebook')}>
              <Facebook className="mr-2 h-4 w-4" /> Registrarse con Facebook
            </Button>
             <Button variant="outline" onClick={() => handleSocialLogin('Twitter')}>
              <Twitter className="mr-2 h-4 w-4" /> Registrarse con Twitter (X)
            </Button>
            <Button variant="outline" onClick={() => handleSocialLogin('Microsoft')}>
              <AppWindow className="mr-2 h-4 w-4" /> Registrarse con Microsoft
            </Button>
            <Button variant="outline" onClick={() => handleSocialLogin('Yahoo')}>
              <Mail className="mr-2 h-4 w-4" /> Registrarse con Yahoo
            </Button>
          </div>
        </CardContent>
        <CardFooter className="text-center text-sm">
          <p className="w-full">
            ¿Ya tienes una cuenta?{' '}
            <Link href="/login" className="font-medium text-primary hover:underline">
              Inicia Sesión
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
