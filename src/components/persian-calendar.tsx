'use client';

import React from 'react';
import DatePicker, { DayValue, CalendarProps as ModernCalendarProps } from 'react-modern-calendar-datepicker';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button'; // Adjusted path
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'; // Adjusted path
import { cn } from '@/lib/utils'; // Adjusted path
import { useTranslations } from 'next-intl';

// Define custom locale for Farsi based on react-modern-calendar-datepicker documentation
const myCustomLocale = {
  // months list by order
  months: [
    'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
    'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
  ],

  // week days by order
  weekDays: [
    { name: 'شنبه', short: 'ش' },
    { name: 'یکشنبه', short: 'ی' },
    { name: 'دوشنبه', short: 'د' },
    { name: 'سه‌شنبه', short: 'س' },
    { name: 'چهارشنبه', short: 'چ' },
    { name: 'پنج‌شنبه', short: 'پ', isWeekend: true },
    { name: 'جمعه', short: 'ج', isWeekend: true },
  ],

  // just play around with this number between 0 and 6
  weekStartingIndex: 6, // Saturday

  // return a string for given date for title/header format
  // You can use date-fns-jalali for formatting if needed, but keeping it simple here
  getToday(gregorainTodayObject: any) {
    // Basic implementation, replace with proper formatting if needed
    return `امروز ${gregorainTodayObject.day}`;
  },

  // return a string for given date for native state format
  toNativeDateInputFormat(date: DayValue) {
    if (!date) return '';
    // Format: YYYY-MM-DD
    return `${date.year}-${String(date.month).padStart(2, '0')}-${String(date.day).padStart(2, '0')}`;
  },

  // Converts native date input format to {year, month, day}
  // Requires careful parsing based on the format defined above
  fromNativeDateInputFormat(nativeDateString: string): DayValue {
     if (!nativeDateString) return null;
     const [year, month, day] = nativeDateString.split('-').map(Number);
     if (isNaN(year) || isNaN(month) || isNaN(day)) return null;
     return { year, month, day };
  },

  // Used for input value when multi dates are selected
  // Concatenate date strings with a comma
  getSelectedDateValues(selectedDates: DayValue[]) {
     if (!selectedDates || selectedDates.length === 0) return [];
     return selectedDates.map(date => this.toNativeDateInputFormat(date)).filter(Boolean) as string[];
   },

  // set digit config
  digitSeparator: ',',
  digitMap: {
    '۰': 0, '۱': 1, '۲': 2, '۳': 3, '۴': 4, '۵': 5, '۶': 6, '۷': 7, '۸': 8, '۹': 9,
  },
  digits: '۰۱۲۳۴۵۶۷۸۹',

  // Number of months to show
  numberOfMonths: 1, // Show one month at a time

   // Optional: short month names
   // monthShort: ["فرو", "ارد", "خرد", "تیر", "مرد", "شهر", "مهر", "آبا", "آذر", "دی", "بهم", "اسف"]
};


interface PersianCalendarProps {
  selectedDay: DayValue;
  onChange: (value: DayValue) => void;
  disabled?: boolean; // Optional disabled prop
  inputClassName?: string;
  inputPlaceholder?: string; // Add placeholder prop
}

export const PersianCalendar: React.FC<PersianCalendarProps> = ({
  selectedDay,
  onChange,
  disabled = false,
  inputClassName,
  inputPlaceholder // Accept placeholder
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const t = useTranslations('DatePicker'); // For placeholder potentially

  // Function to format the selected DayValue for display
  const formatDisplayDate = (date: DayValue): string => {
    if (!date) return '';
    // Simple format YYYY/MM/DD, using Persian digits
    const year = String(date.year).split('').map(d => myCustomLocale.digits[parseInt(d, 10)] || d).join('');
    const month = String(date.month).padStart(2, '۰').split('').map(d => myCustomLocale.digits[parseInt(d, 10)] || d).join('');
    const day = String(date.day).padStart(2, '۰').split('').map(d => myCustomLocale.digits[parseInt(d, 10)] || d).join('');
    return `${year}/${month}/${day}`;
  };

  const handleSelectDay = (day: DayValue) => {
    onChange(day);
    setIsOpen(false); // Close popover on selection
  };


  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-full ltr:pl-3 rtl:pr-3 ltr:text-left rtl:text-right font-normal justify-start',
            !selectedDay && 'text-muted-foreground',
            inputClassName // Apply custom class name
          )}
          disabled={disabled}
          aria-label={inputPlaceholder || 'انتخاب تاریخ'} // Aria label for accessibility
        >
          <CalendarIcon className="ltr:mr-2 rtl:ml-2 h-4 w-4" />
          {selectedDay ? (
            formatDisplayDate(selectedDay)
          ) : (
            <span>{inputPlaceholder || 'تاریخ را انتخاب کنید'}</span> // Use placeholder
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
         {/* Calendar component inside Popover */}
         <DatePicker
            value={selectedDay}
            onChange={handleSelectDay}
            shouldHighlightWeekends
            locale={myCustomLocale} // Use the custom Farsi locale
            calendarClassName="responsive-calendar" // Optional: for custom styling
            inputPlaceholder="تاریخ را انتخاب کنید" // Set placeholder for input rendering if used directly
            renderInput={({ ref }) => <></>} // Render empty because we use Button as trigger
            calendarPopperPosition="bottom" // Adjust position if needed
         />
      </PopoverContent>
    </Popover>
  );
};
