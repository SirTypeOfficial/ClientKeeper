'use client'; // Required for onClick handlers, router, and translations

import type { ReactNode } from 'react';
import { Users, UserPlus, Settings, Import, LogOut } from 'lucide-react';
import { useTranslations } from 'next-intl'; // Import useTranslations

import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import LanguageSwitcher from '@/components/language-switcher'; // Import the switcher
import { Link, usePathname, useRouter } from '@/navigation'; // Import from custom navigation config


export default function AppLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  const t = useTranslations('AppLayout'); // Initialize translations

  const handleLogout = () => {
    // Clear the authentication cookie
    document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

    toast({
      title: t('logoutToastTitle'),
      description: t('logoutToastDescription'),
    });

    // Redirect to login page (locale is handled by next-intl router)
    router.push('/login');
  };

  // Determine active route for styling (optional)
  const isActive = (href: string) => pathname === href;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Desktop Header */}
       <header className="hidden md:flex justify-between items-center container mx-auto py-4 px-4 md:px-6 lg:px-8 border-b">
          <h1 className="text-xl font-semibold">{t('appName')}</h1>
          <nav className="flex items-center gap-4">
             {/* Use next-intl Link */}
             <Link href="/" passHref legacyBehavior>
               <Button variant={isActive('/') ? 'secondary' : 'ghost'}><Users className="ltr:mr-2 rtl:ml-2 h-4 w-4"/> {t('navCustomers')}</Button>
             </Link>
             <Link href="/add-customer" passHref legacyBehavior>
               <Button variant={isActive('/add-customer') ? 'secondary' : 'ghost'}><UserPlus className="ltr:mr-2 rtl:ml-2 h-4 w-4"/> {t('navAddCustomer')}</Button>
             </Link>
              <Link href="/import-export" passHref legacyBehavior>
               <Button variant={isActive('/import-export') ? 'secondary' : 'ghost'}><Import className="ltr:mr-2 rtl:ml-2 h-4 w-4"/> {t('navImportExport')}</Button>
             </Link>
             <Link href="/settings" passHref legacyBehavior>
               <Button variant={isActive('/settings') ? 'secondary' : 'ghost'}><Settings className="ltr:mr-2 rtl:ml-2 h-4 w-4"/> {t('navSettings')}</Button>
             </Link>
             <LanguageSwitcher /> {/* Add Language Switcher */}
             <Button variant="outline" onClick={handleLogout}>
               <LogOut className="ltr:mr-2 rtl:ml-2 h-4 w-4" /> {t('navLogout')}
             </Button>
          </nav>
       </header>

      {/* Mobile Header with Language Switcher */}
      <header className="md:hidden flex justify-between items-center p-4 border-b">
        <h1 className="text-lg font-semibold">{t('appName')}</h1>
        <LanguageSwitcher />
      </header>

      <main className="flex-1 container mx-auto py-4 px-4 md:px-6 lg:px-8">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="sticky bottom-0 left-0 right-0 border-t bg-background shadow-md md:hidden z-10">
        <div className="grid grid-cols-5 items-center h-16 px-1">
          <Link href="/" passHref legacyBehavior>
            <Button variant={isActive('/') ? 'secondary' : 'ghost'} className="flex flex-col items-center justify-center h-full pt-1 text-center w-full">
              <Users className="h-5 w-5" />
              <span className="text-xs mt-1 whitespace-nowrap">{t('navCustomers')}</span>
            </Button>
          </Link>
          <Link href="/add-customer" passHref legacyBehavior>
            <Button variant={isActive('/add-customer') ? 'secondary' : 'ghost'} className="flex flex-col items-center justify-center h-full pt-1 text-center w-full">
              <UserPlus className="h-5 w-5" />
              <span className="text-xs mt-1 whitespace-nowrap">{t('navMobileAdd')}</span>
            </Button>
          </Link>
          <Link href="/import-export" passHref legacyBehavior>
            <Button variant={isActive('/import-export') ? 'secondary' : 'ghost'} className="flex flex-col items-center justify-center h-full pt-1 text-center w-full">
              <Import className="h-5 w-5" />
              <span className="text-xs mt-1 whitespace-nowrap">{t('navMobileImpExp')}</span>
            </Button>
          </Link>
          <Link href="/settings" passHref legacyBehavior>
            <Button variant={isActive('/settings') ? 'secondary' : 'ghost'} className="flex flex-col items-center justify-center h-full pt-1 text-center w-full">
              <Settings className="h-5 w-5" />
              <span className="text-xs mt-1 whitespace-nowrap">{t('navSettings')}</span>
            </Button>
          </Link>
          <Button variant="ghost" onClick={handleLogout} className="flex flex-col items-center justify-center h-full pt-1 text-center w-full text-destructive hover:text-destructive/90 hover:bg-destructive/10">
            <LogOut className="h-5 w-5" />
            <span className="text-xs mt-1 whitespace-nowrap">{t('navLogout')}</span>
          </Button>
        </div>
      </nav>
    </div>
  );
}
