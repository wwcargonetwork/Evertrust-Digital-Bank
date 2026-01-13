'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Landmark, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { useAuth } from '@/firebase';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
});

type FormValues = z.infer<typeof formSchema>;

export default function SigninPage() {
  const [showPassword, setShowPassword] = useState(false);
  const auth = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: FormValues) {
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      router.push('/dashboard'); // Redirect to dashboard on successful login
    } catch (error: any) {
      console.error('Sign In Error:', error);
      toast({
        variant: 'destructive',
        title: 'Sign In Failed',
        description: error.message || 'An unexpected error occurred.',
      });
    }
  }

  async function handleGoogleSignIn() {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push('/dashboard');
    } catch (error: any) {
      console.error('Google Sign In Error:', error);
      toast({
        variant: 'destructive',
        title: 'Google Sign In Failed',
        description: error.message || 'An unexpected error occurred.',
      });
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12 sm:px-6 lg:px-8">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Card className="w-full max-w-md shadow-2xl">
              <CardHeader>
                <Link href="/" className="flex items-center justify-center space-x-2 mb-4">
                    <Landmark className="h-8 w-8 text-primary" />
                    <span className="text-2xl font-bold font-headline text-primary">Evertrust</span>
                </Link>
                <CardTitle className="text-center font-headline text-3xl">Welcome Back</CardTitle>
                <CardDescription className="text-center">
                  Sign in to access your account and continue your journey.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="john.doe@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input type={showPassword ? "text" : "password"} placeholder="••••••••" {...field} />
                               <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground">
                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <div className="flex items-center justify-end">
                        <Link href="#" className="text-sm font-medium text-accent hover:underline">
                            Forgot password?
                        </Link>
                    </div>
                    <Button type="submit" className="w-full" style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }} disabled={form.formState.isSubmitting}>
                      Sign In <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </Form>
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full" onClick={handleGoogleSignIn}>
                    <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 381.5 512 244 512 111.8 512 0 400.2 0 264.8S111.8 17.6 244 17.6c70.3 0 129.8 27.8 174.4 72.4l-64 64c-21-20.5-49.8-39.7-110.4-39.7-93.5 0-169.5 76.8-169.5 171.4 0 94.7 76 171.4 169.5 171.4 106.8 0 146-77.2 149.8-118.4H244V261.8h244z"></path></svg>
                    Sign in with Google
                </Button>
              </CardContent>
              <CardFooter>
                 <p className="w-full text-center text-sm text-muted-foreground">
                    Don't have an account?{' '}
                    <Link href="/signup" className="font-semibold text-accent hover:underline">
                      Sign Up
                    </Link>
                  </p>
              </CardFooter>
            </Card>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
