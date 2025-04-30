'use client'; // Add this directive

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Phone, Key } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  // TODO: Implement actual authentication logic (OTP generation/verification)

  const handleLogin = (event: React.FormEvent) => {
     event.preventDefault();
     alert("Login functionality not implemented yet.");
     // In a real app:
     // 1. Get email/phone number from form.
     // 2. Send request to backend to generate and send OTP.
     // 3. Show OTP input field.
     // 4. Verify OTP with backend.
     // 5. On success, redirect to '/'.

      // Simulate successful login for now by setting a mock token and redirecting
      document.cookie = "auth_token=mock-token; path=/; max-age=3600"; // Expires in 1 hour
      window.location.href = '/'; // Redirect to homepage
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-secondary">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Client Keeper Login</CardTitle>
          <CardDescription>Enter your email or phone to receive an OTP.</CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="login-credential">Email or Phone Number</Label>
              <div className="relative">
                {/* Icon can change based on input type detection, basic placeholder for now */}
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                 <Input id="login-credential" type="text" placeholder="Email or Phone" required className="pl-10" />
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
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90">Send OTP</Button>
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
// It should be defined in a Server Component, possibly a layout file.
// export const metadata = {
//   title: 'Login - Client Keeper',
//   description: 'Login to Client Keeper.',
// };
