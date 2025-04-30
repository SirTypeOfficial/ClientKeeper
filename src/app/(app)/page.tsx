import { CustomerTable } from '@/components/customer-table';
import { MOCK_CUSTOMERS } from '@/lib/mock-data'; // Using mock data for now

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
      <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
      <CustomerTable initialCustomers={customers} />
    </div>
  );
}

// Add metadata for the page
export const metadata = {
  title: 'Customers - Client Keeper',
  description: 'View and manage your customer list.',
};
