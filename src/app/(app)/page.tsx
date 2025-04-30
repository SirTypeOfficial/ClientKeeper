import Link from 'next/link';
import { UserPlus } from 'lucide-react';

import { CustomerTable } from '@/components/customer-table';
import { MOCK_CUSTOMERS } from '@/lib/mock-data'; // Using mock data for now
import { Button } from '@/components/ui/button';


// TODO: Replace mock data fetch with actual data fetching (e.g., from Firestore)
async function getCustomers() {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  // In a real app, fetch from Firestore here
  return MOCK_CUSTOMERS;
}

export default async function CustomersPage() {
  const customers = await getCustomers();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
        <Link href="/add-customer" passHref legacyBehavior>
          <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <UserPlus className="mr-2 h-4 w-4" /> Create Customer
          </Button>
        </Link>
      </div>
      <CustomerTable initialCustomers={customers} />
    </div>
  );
}

// Add metadata for the page
export const metadata = {
  title: 'Customers - Client Keeper',
  description: 'View and manage your customer list.',
};
