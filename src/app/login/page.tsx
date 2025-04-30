'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Key } from "lucide-react";
import { useToast } from '@/hooks/use-toast';

// Metadata defined outside the component

export default function LoginPage() {
  const { toast } = useToast();
  const router = useRouter(); // Initialize useRouter
  const [credential, setCredential] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleLogin = async (event: React.FormEvent) => {
     event.preventDefault();
     setIsSubmitting(true);

     // TODO: Replace with actual authentication logic (OTP generation/verification)

     const allowedEmail = "mv6468@gmail.com"; // Hardcoded allowed email

     // Simulate API call delay
     await new Promise(resolve => setTimeout(resolve, 500));

     if (credential === allowedEmail) {
        // Simulate successful login by setting a mock token
        document.cookie = "auth_token=mock-token; path=/; max-age=3600"; // Expires in 1 hour

        toast({
           title: "Login Successful",
           description: `Welcome back!`,
           variant: 'default',
           className: 'bg-accent text-accent-foreground border-accent',
        });

        // Use router.push for navigation
        router.push('/'); // Redirect to homepage using Next.js router

     } else {
        // Show error toast
        toast({
           title: "Login Failed",
           description: "Invalid email or phone number. Please try again.",
           variant: "destructive",
        });
        setIsSubmitting(false); // Allow user to try again
     }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-secondary">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Client Keeper Login</CardTitle>
          <CardDescription>Enter your email or phone to login.</CardDescription>
          <p className="text-xs text-muted-foreground">(Test with: mv6468@gmail.com)</p>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="login-credential">Email or Phone Number</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                 <Input
                    id="login-credential"
                    type="text"
                    placeholder="Email or Phone"
                    required
                    className="pl-10"
                    value={credential}
                    onChange={(e) => setCredential(e.target.value)}
                    disabled={isSubmitting}
                 />
              </div>
            </div>
             {/* Placeholder for OTP input - show after initial submission */}
             {/* <div className="space-y-2 hidden">
               <Label htmlFor="otp">OTP Code</Label>
               <div className="relative">
                 <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                 <Input id="otp" type="text" placeholder="Enter OTP" required className="pl-10" />
               </div>
             </div> */}
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isSubmitting}>
             {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </>
             ) : (
                 "Login"
             )}
            </Button>
            {/* Link to registration if needed */}
            {/* <p className="text-xs text-center text-muted-foreground">
              Don't have an account? <Link href="/register" className="underline text-primary">Register here</Link>
            </p> */}
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

// Metadata cannot be exported from a Client Component.
// It should be defined in a parent Server Component or Layout.
// export const metadata = {
//   title: 'Login - Client Keeper',
//   description: 'Login to Client Keeper.',
// };
