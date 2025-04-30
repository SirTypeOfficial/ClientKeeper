'use client';

import * as React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { format as formatGregorian } from 'date-fns';
import { format as formatJalali, parse as parseJalali } from 'date-fns-jalali'; // Import parseJalali
import { Calendar as CalendarIcon } from 'lucide-react';
import { DayPicker, CalendarProps as DayPickerProps } from 'react-day-picker';
import { DayValue } from 'react-modern-calendar-datepicker';

import { cn } from '@/lib/utils'; // Adjusted path
import { Button } from '@/components/ui/button'; // Adjusted path
import { Calendar as GregorianCalendar } from '@/components/ui/calendar'; // Adjusted path
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'; // Adjusted path
import { PersianCalendar } from '@/components/persian-calendar'; // Adjusted path

// Helper to convert Date to DayValue (for Persian Calendar)
const dateToDayValue = (date: Date | undefined): DayValue => {
  if (!date) return null;
   // Convert Gregorian date to Jalali year, month, day for DayValue
  try {
      const year = parseInt(formatJalali(date, 'yyyy'), 10);
      const month = parseInt(formatJalali(date, 'M'), 10); // Month (1-12)
      const day = parseInt(formatJalali(date, 'd'), 10); // Day of month
      return { year, month, day };
  } catch (e) {
      console.error("Error converting date to DayValue for Jalali", e);
       // Fallback to Gregorian parts if Jalali formatting fails
      return { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
  }
};

// Helper to convert DayValue (assumed Jalali) to Date (Gregorian)
const dayValueToDate = (dayValue: DayValue): Date | undefined => {
    if (!dayValue) return undefined;
    try {
        // Use date-fns-jalali to parse Jalali date string into Gregorian Date object
        const jalaliDateString = `${dayValue.year}-${dayValue.month}-${dayValue.day}`;
        // The third argument `new Date()` is crucial for `parse` to work correctly
        return parseJalali(jalaliDateString, 'yyyy-M-d', new Date());
    } catch (e) {
        console.error("Error converting DayValue (Jalali) to Date", e);
         // Fallback: create Gregorian date (likely incorrect if DayValue was Jalali)
         return new Date(Date.UTC(dayValue.year, dayValue.month - 1, dayValue.day));
    }
};


interface DatePickerProps {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  disabled?: (date: Date) => boolean;
  placeholder?: string; // Add placeholder prop
  inputClassName?: string; // Allow passing classname to the trigger button
}

export function DatePicker({ value, onChange, disabled, placeholder, inputClassName }: DatePickerProps) {
  const locale = useLocale();
  const t = useTranslations('DatePicker');
  const [isOpen, setIsOpen] = React.useState(false);

  const handleGregorianSelect = (date: Date | undefined) => {
    onChange(date);
    setIsOpen(false);
  };

  const handlePersianSelect = (dayValue: DayValue) => {
      const selectedDate = dayValueToDate(dayValue); // Convert DayValue (Jalali) to Date (Gregorian)
      onChange(selectedDate);
      setIsOpen(false);
  };

  const formatDisplayDate = (date: Date | undefined): string => {
      if (!date) return '';
      try {
          // Ensure date is valid before formatting
          if (isNaN(date.getTime())) return 'Invalid Date';
          return locale === 'fa' ? formatJalali(date, 'yyyy/MM/dd') : formatGregorian(date, 'PPP');
      } catch (e) {
          console.error("Error formatting date:", e, "Date:", date);
          // Fallback to basic ISO string if formatting fails
          return date.toISOString().split('T')[0];
      }
  };


  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-full ltr:pl-3 rtl:pr-3 ltr:text-left rtl:text-right font-normal justify-start',
            !value && 'text-muted-foreground',
            inputClassName // Apply custom class name
          )}
           aria-label={placeholder || (locale === 'fa' ? 'انتخاب تاریخ' : 'Pick a date')}
        >
          <CalendarIcon className="ltr:mr-2 rtl:ml-2 h-4 w-4" />
          {value ? (
             formatDisplayDate(value)
          ) : (
            <span>{placeholder || (locale === 'fa' ? 'تاریخ را انتخاب کنید' : 'Pick a date')}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        {locale === 'fa' ? (
          <PersianCalendar
            selectedDay={dateToDayValue(value)} // Convert Date (Gregorian) to DayValue (Jalali)
            onChange={handlePersianSelect}
            // TODO: Map the `disabled` function for PersianCalendar if needed
            // The `disabled` prop in react-modern-calendar-datepicker might expect DayValue predicate
            inputPlaceholder={placeholder || 'تاریخ را انتخاب کنید'}
            inputClassName="hidden" // Hide the default input rendering of PersianCalendar
          />
        ) : (
          <GregorianCalendar
            mode="single"
            selected={value}
            onSelect={handleGregorianSelect}
            disabled={disabled}
            initialFocus
             months={t.raw('months')}
             weekdaysShort={t.raw('weekdaysShort')}
             dir="ltr" // Explicitly set LTR for Gregorian calendar
          />
        )}
      </PopoverContent>
    </Popover>
  );
}
