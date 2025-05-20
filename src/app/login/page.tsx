
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
          <CardTitle className="text-2xl font-bold">Welcome Back!</CardTitle>
          <CardDescription>Log in to your MTM account.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="you@example.com" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
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
                Forgot password?
              </Link>
            </div>
            <Button type="submit" className="w-full">
              Log In
            </Button>
          </form>
          
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or log in with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <Button variant="outline" onClick={() => handleSocialLogin('Google')}>
              <Chrome className="mr-2 h-4 w-4" /> Log in with Google
            </Button>
            <Button variant="outline" onClick={() => handleSocialLogin('Facebook')}>
              <Facebook className="mr-2 h-4 w-4" /> Log in with Facebook
            </Button>
            <Button variant="outline" onClick={() => handleSocialLogin('Twitter')}>
              <Twitter className="mr-2 h-4 w-4" /> Log in with Twitter (X)
            </Button>
            <Button variant="outline" onClick={() => handleSocialLogin('Microsoft')}>
              <AppWindow className="mr-2 h-4 w-4" /> Log in with Microsoft
            </Button>
            <Button variant="outline" onClick={() => handleSocialLogin('Yahoo')}>
              <Mail className="mr-2 h-4 w-4" /> Log in with Yahoo
            </Button>
          </div>
        </CardContent>
        <CardFooter className="text-center text-sm">
          <p className="w-full">
            Don't have an account?{' '}
            <Link href="/register" className="font-medium text-primary hover:underline">
              Sign Up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
