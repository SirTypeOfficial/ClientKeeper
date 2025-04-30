import { UserPlus } from 'lucide-react';
import { getTranslator } from 'next-intl/server'; // Import getTranslator

import { CustomerTable } from '@/components/customer-table';
import { MOCK_CUSTOMERS } from '@/lib/mock-data'; // Using mock data for now
import { Button } from '@/components/ui/button';
import { Link } from '@/navigation'; // Import from custom navigation


// TODO: Replace mock data fetch with actual data fetching (e.g., from Firestore)
async function getCustomers() {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  // In a real app, fetch from Firestore here
  return MOCK_CUSTOMERS;
}

// Generate metadata dynamically based on locale
export async function generateMetadata({params: {locale}}: {params: {locale: string}}) {
  const t = await getTranslator(locale, 'CustomersPage');
  return {
    title: t('pageTitle'),
    description: t('pageDescription'),
  };
}


export default async function CustomersPage({params: {locale}}: {params: {locale: string}}) {
  const customers = await getCustomers();
  const t = await getTranslator(locale, 'CustomersPage'); // Get translator instance

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
        <Link href="/add-customer" passHref legacyBehavior>
          <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <UserPlus className="ltr:mr-2 rtl:ml-2 h-4 w-4" /> {t('createButton')}
          </Button>
        </Link>
      </div>
      <CustomerTable initialCustomers={customers} />
    </div>
  );
}
