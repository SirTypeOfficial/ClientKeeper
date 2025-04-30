'use client'; // Required for onClick handlers and router

import type { ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Users, UserPlus, Settings, Import, LogOut } from 'lucide-react'; // Added LogOut icon

import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export default function AppLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = () => {
    // Clear the authentication cookie
    document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });

    // Redirect to login page
    router.push('/login');
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Optional: Add a simple header for desktop view */}
       <header className="hidden md:flex justify-between items-center container mx-auto py-4 px-4 md:px-6 lg:px-8 border-b">
          <h1 className="text-xl font-semibold">Client Keeper</h1>
          <nav className="flex items-center gap-4">
             <Link href="/" passHref legacyBehavior>
               <Button variant="ghost"><Users className="mr-2 h-4 w-4"/> Customers</Button>
             </Link>
             <Link href="/add-customer" passHref legacyBehavior>
               <Button variant="ghost"><UserPlus className="mr-2 h-4 w-4"/> Add Customer</Button>
             </Link>
              <Link href="/import-export" passHref legacyBehavior>
               <Button variant="ghost"><Import className="mr-2 h-4 w-4"/> Import/Export</Button>
             </Link>
             <Link href="/settings" passHref legacyBehavior>
               <Button variant="ghost"><Settings className="mr-2 h-4 w-4"/> Settings</Button>
             </Link>
             <Button variant="outline" onClick={handleLogout}>
               <LogOut className="mr-2 h-4 w-4" /> Logout
             </Button>
          </nav>
       </header>

      <main className="flex-1 container mx-auto py-4 px-4 md:px-6 lg:px-8">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="sticky bottom-0 left-0 right-0 border-t bg-background shadow-md md:hidden z-10">
        <div className="grid grid-cols-5 items-center h-16 px-1"> {/* Changed to grid-cols-5 */}
          <Link href="/" passHref legacyBehavior>
            <Button variant="ghost" className="flex flex-col items-center justify-center h-full pt-1 text-center w-full">
              <Users className="h-5 w-5" />
              <span className="text-xs mt-1 whitespace-nowrap">Customers</span>
            </Button>
          </Link>
          <Link href="/add-customer" passHref legacyBehavior>
            <Button variant="ghost" className="flex flex-col items-center justify-center h-full pt-1 text-center w-full">
              <UserPlus className="h-5 w-5" />
              <span className="text-xs mt-1 whitespace-nowrap">Add</span>
            </Button>
          </Link>
          <Link href="/import-export" passHref legacyBehavior>
            <Button variant="ghost" className="flex flex-col items-center justify-center h-full pt-1 text-center w-full">
              <Import className="h-5 w-5" />
              <span className="text-xs mt-1 whitespace-nowrap">Imp/Exp</span> {/* Shortened text */}
            </Button>
          </Link>
          <Link href="/settings" passHref legacyBehavior>
            <Button variant="ghost" className="flex flex-col items-center justify-center h-full pt-1 text-center w-full">
              <Settings className="h-5 w-5" />
              <span className="text-xs mt-1 whitespace-nowrap">Settings</span>
            </Button>
          </Link>
          {/* Logout Button */}
          <Button variant="ghost" onClick={handleLogout} className="flex flex-col items-center justify-center h-full pt-1 text-center w-full text-destructive hover:text-destructive/90 hover:bg-destructive/10">
            <LogOut className="h-5 w-5" />
            <span className="text-xs mt-1 whitespace-nowrap">Logout</span>
          </Button>
        </div>
      </nav>
       {/* Placeholder for desktop sidebar if needed in the future */}
       {/* <aside className="hidden md:block w-64 border-r p-4">...</aside> */}
    </div>
  );
}