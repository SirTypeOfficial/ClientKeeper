import type { ReactNode } from 'react';
import Link from 'next/link';
import { Users, UserPlus, Settings, Import } from 'lucide-react';

import { Button } from '@/components/ui/button';

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container mx-auto py-4 px-4 md:px-6 lg:px-8">
        {children}
      </main>
      <nav className="sticky bottom-0 left-0 right-0 border-t bg-background shadow-md md:hidden">
        <div className="flex justify-around items-center h-16 px-4">
          <Link href="/" passHref legacyBehavior>
            <Button variant="ghost" className="flex flex-col items-center h-full pt-2">
              <Users className="h-6 w-6" />
              <span className="text-xs mt-1">Customers</span>
            </Button>
          </Link>
          <Link href="/add-customer" passHref legacyBehavior>
            <Button variant="ghost" className="flex flex-col items-center h-full pt-2">
              <UserPlus className="h-6 w-6" />
              <span className="text-xs mt-1">Add</span>
            </Button>
          </Link>
          <Link href="/import-export" passHref legacyBehavior>
            <Button variant="ghost" className="flex flex-col items-center h-full pt-2">
              <Import className="h-6 w-6" />
              <span className="text-xs mt-1">Import/Export</span>
            </Button>
          </Link>
          <Link href="/settings" passHref legacyBehavior>
            <Button variant="ghost" className="flex flex-col items-center h-full pt-2">
              <Settings className="h-6 w-6" />
              <span className="text-xs mt-1">Settings</span>
            </Button>
          </Link>
        </div>
      </nav>
       {/* Placeholder for desktop sidebar/menu if needed in the future */}
       {/* <aside className="hidden md:block w-64 border-r p-4">...</aside> */}
    </div>
  );
}
