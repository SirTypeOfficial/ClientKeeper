'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl'; // Use next-intl hook for translations
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Key } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import { useRouter } from '@/navigation'; // Import from custom navigation

export default function LoginPage() {
  const t = useTranslations('LoginPage'); // Initialize translations
  const { toast } = useToast();
  const router = useRouter();
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
           title: t('loginSuccessTitle'),
           description: t('loginSuccessDescription'),
           variant: 'default',
           className: 'bg-accent text-accent-foreground border-accent',
        });

        // Use router.push for navigation (locale is handled automatically)
        router.push('/'); // Redirect to homepage

     } else {
        // Show error toast
        toast({
           title: t('loginFailedTitle'),
           description: t('loginFailedDescription'),
           variant: "destructive",
        });
        setIsSubmitting(false); // Allow user to try again
     }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-secondary">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">{t('title')}</CardTitle>
          <CardDescription>{t('description')}</CardDescription>
          <p className="text-xs text-muted-foreground">{t('testCredential', {email: 'mv6468@gmail.com'})}</p>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="login-credential">{t('credentialLabel')}</Label>
              <div className="relative">
                <Mail className="absolute ltr:left-3 rtl:right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                 <Input
                    id="login-credential"
                    type="text"
                    placeholder={t('credentialPlaceholder')}
                    required
                    className="ltr:pl-10 rtl:pr-10"
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
                 <Key className="absolute ltr:left-3 rtl:right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                 <Input id="otp" type="text" placeholder="Enter OTP" required className="ltr:pl-10 rtl:pr-10" />
               </div>
             </div> */}
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isSubmitting}>
             {isSubmitting ? (
                <>
                  <svg className="animate-spin ltr:-ml-1 rtl:-mr-1 ltr:mr-3 rtl:ml-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t('loggingInButton')}
                </>
             ) : (
                 t('loginButton')
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
