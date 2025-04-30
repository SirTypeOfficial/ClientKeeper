'use client';

import * as React from 'react';
import type { Customer } from '@/lib/types';
import { useLocale, useTranslations } from 'next-intl'; // Import localization hooks
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { format as formatGregorian } from 'date-fns';
import { format as formatJalali } from 'date-fns-jalali'; // Import Jalali format
import { ArrowUpDown } from 'lucide-react';

type SortKey = 'fullName' | 'phoneNumber' | 'birthday' | 'dateAdded';
type SortDirection = 'asc' | 'desc';

interface CustomerTableProps {
  initialCustomers: Customer[];
}

export function CustomerTable({ initialCustomers }: CustomerTableProps) {
  const t = useTranslations('CustomersPage'); // Initialize translations
  const locale = useLocale(); // Get current locale
  const [customers, setCustomers] = React.useState<Customer[]>(initialCustomers);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [sortKey, setSortKey] = React.useState<SortKey>('dateAdded');
  const [sortDirection, setSortDirection] = React.useState<SortDirection>('desc');

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const sortedAndFilteredCustomers = React.useMemo(() => {
    let filtered = customers;

    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      filtered = customers.filter(
        (customer) =>
          customer.firstName.toLowerCase().includes(lowerSearchTerm) ||
          (customer.lastName && customer.lastName.toLowerCase().includes(lowerSearchTerm)) ||
          (customer.phoneNumber && customer.phoneNumber.includes(lowerSearchTerm)) ||
          (customer.tags && customer.tags.some(tag => tag.toLowerCase().includes(lowerSearchTerm)))
      );
    }

    const sorted = [...filtered].sort((a, b) => {
      let valA: string | number | Date | undefined;
      let valB: string | number | Date | undefined;

      switch (sortKey) {
        case 'fullName':
          valA = `${a.firstName} ${a.lastName || ''}`.trim().toLowerCase();
          valB = `${b.firstName} ${b.lastName || ''}`.trim().toLowerCase();
          break;
        case 'phoneNumber':
          valA = a.phoneNumber || '';
          valB = b.phoneNumber || '';
          break;
        case 'birthday':
          if (!a.birthday) return 1;
          if (!b.birthday) return -1;
          valA = a.birthday;
          valB = b.birthday;
          break;
        case 'dateAdded':
          valA = a.dateAdded;
          valB = b.dateAdded;
          break;
        default:
          return 0;
      }

      // Handle potential type mismatches (though less likely with defined SortKey)
      if (typeof valA === 'string' && typeof valB === 'string') {
         const compare = valA.localeCompare(valB, locale); // Use localeCompare for strings
         return sortDirection === 'asc' ? compare : -compare;
      } else if (valA instanceof Date && valB instanceof Date) {
         const compare = valA.getTime() - valB.getTime();
         return sortDirection === 'asc' ? compare : -compare;
      } else if (typeof valA === 'number' && typeof valB === 'number') {
          const compare = valA - valB;
          return sortDirection === 'asc' ? compare : -compare;
      }
      // Basic comparison for other types or mixed types (less ideal)
      if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return sortDirection === 'asc' ? 1 : -1;

      return 0;
    });

    return sorted;
  }, [customers, searchTerm, sortKey, sortDirection, locale]); // Add locale dependency

  const renderSortIcon = (key: SortKey) => {
     if (sortKey !== key) return <ArrowUpDown className="ltr:ml-2 rtl:mr-2 h-4 w-4 opacity-30" />;
     return sortDirection === 'asc' ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="ltr:ml-2 rtl:mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
     ) : (
       <svg xmlns="http://www.w3.org/2000/svg" className="ltr:ml-2 rtl:mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
     );
   };

   // Function to format date based on locale
   const formatDate = (date: Date) => {
       try {
           return locale === 'fa' ? formatJalali(date, 'yyyy/MM/dd') : formatGregorian(date, 'PP');
       } catch (e) {
           console.error("Error formatting date:", e);
           return date.toLocaleDateString(locale); // Fallback to browser locale formatting
       }
   };

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col sm:flex-row gap-2">
        <Input
          placeholder={t('tableSearchPlaceholder')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
               <TableHead onClick={() => handleSort('fullName')} className="cursor-pointer">
                 <div className="flex items-center">{t('tableHeaderName')} {renderSortIcon('fullName')}</div>
               </TableHead>
               <TableHead onClick={() => handleSort('phoneNumber')} className="cursor-pointer hidden md:table-cell">
                 <div className="flex items-center">{t('tableHeaderPhone')} {renderSortIcon('phoneNumber')}</div>
               </TableHead>
               <TableHead onClick={() => handleSort('birthday')} className="cursor-pointer hidden lg:table-cell">
                 <div className="flex items-center">{t('tableHeaderBirthday')} {renderSortIcon('birthday')}</div>
               </TableHead>
              <TableHead className="hidden md:table-cell">{t('tableHeaderTags')}</TableHead>
              <TableHead onClick={() => handleSort('dateAdded')} className="cursor-pointer hidden lg:table-cell">
                <div className="flex items-center">{t('tableHeaderDateAdded')} {renderSortIcon('dateAdded')}</div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedAndFilteredCustomers.length > 0 ? (
              sortedAndFilteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">
                    {customer.firstName} {customer.lastName || ''}
                     {/* Mobile view details */}
                     <div className="text-sm text-muted-foreground md:hidden">
                        {customer.phoneNumber && <div>{customer.phoneNumber}</div>}
                        {customer.tags && customer.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {customer.tags.map((tag) => (
                              <Badge key={tag} variant="secondary">{tag}</Badge>
                            ))}
                          </div>
                        )}
                     </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{customer.phoneNumber || '-'}</TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {customer.birthday ? formatDate(customer.birthday) : '-'}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {customer.tags && customer.tags.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {customer.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">{tag}</Badge>
                        ))}
                      </div>
                    ) : (
                      '-'
                    )}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {formatDate(customer.dateAdded)}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  {t('tableNoCustomers')}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
