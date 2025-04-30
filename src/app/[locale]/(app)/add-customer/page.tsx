
'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useLocale, useTranslations } from 'next-intl'; // Import localization hooks
import { UserPlus, Phone, Tags, Contact, X as XIcon } from 'lucide-react'; // Removed CalendarDays, Calendar

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DatePicker } from '@/components/date-picker'; // Import the unified DatePicker
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { getContacts, type Contact as PhoneContact } from '@/services/contacts';
import { useRouter } from '@/navigation'; // Import router

// Zod schema remains the same
const formSchema = z.object({
  firstName: z.string().min(1, 'First name is required'), // Keep basic validation message, will be overridden by translation
  lastName: z.string().optional(),
  phoneNumber: z.string().optional(),
  birthday: z.date().optional(),
  tags: z.string().optional(),
});

type AddCustomerFormValues = z.infer<typeof formSchema>;

// Metadata moved to generateMetadata in layout/page structure if needed for Server Component version
// export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
//   const t = await getTranslations({ locale, namespace: 'AddCustomerPage' });
//   return {
//     title: t('pageTitle'),
//     description: t('pageDescription'),
//   };
// }

export default function AddCustomerPage() {
  const t = useTranslations('AddCustomerPage'); // Initialize translations
  const locale = useLocale(); // Get current locale
  const { toast } = useToast();
  const router = useRouter(); // Initialize router
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [phoneContacts, setPhoneContacts] = React.useState<PhoneContact[]>([]);
  const [showContactPicker, setShowContactPicker] = React.useState(false);

  // Update form resolver with translated messages
  const form = useForm<AddCustomerFormValues>({
    resolver: zodResolver(z.object({
        firstName: z.string().min(1, t('formFirstNameRequired')), // Use translated message
        lastName: z.string().optional(),
        phoneNumber: z.string().optional(),
        birthday: z.date().optional(),
        tags: z.string().optional(),
    })),
    defaultValues: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      tags: '',
    },
  });

  async function onSubmit(values: AddCustomerFormValues) {
    setIsSubmitting(true);
    console.log('Simulating Save - Form Values:', values);

    // Simulate API call / Firestore save
    await new Promise(resolve => setTimeout(resolve, 1000));

    // TODO: Replace with actual Firestore save logic or state management update
    // For now, we just show a success message, reset the form, and redirect.

    setIsSubmitting(false);
    toast({
      title: t('addSuccessToastTitle'),
      description: t('addSuccessToastDescription', { firstName: values.firstName }),
      variant: 'default',
      className: 'bg-accent text-accent-foreground border-accent',
    });
    form.reset(); // Reset form fields
    // Optionally redirect to the customer list after saving
    router.push('/');
  }

   const handleImportFromContacts = async () => {
    try {
      // TODO: Implement actual permission request for contacts using native capabilities if needed
      const permissionGranted = confirm(t('contactImportPermissionPrompt'));
      if (!permissionGranted) {
         toast({ title: t('contactImportPermissionDeniedTitle'), description: t('contactImportPermissionDeniedDescription'), variant: "destructive" });
         return;
      }

      const contacts = await getContacts(); // Assuming this returns mock or actual data
      if (contacts && contacts.length > 0) {
          setPhoneContacts(contacts);
          setShowContactPicker(true);
      } else {
          toast({ title: t('contactPickerNoContacts'), variant: "default" });
      }
    } catch (error) {
       console.error("Failed to fetch contacts:", error);
       toast({ title: t('contactImportErrorTitle'), description: t('contactImportErrorDescription'), variant: "destructive" });
    }
   };

   const handleSelectContact = (contact: PhoneContact) => {
      const nameParts = contact.name.split(' ');
      const firstName = nameParts[0] || contact.name; // Fallback to full name if no space
      const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

      form.setValue('firstName', firstName, { shouldValidate: true });
      form.setValue('lastName', lastName);
      form.setValue('phoneNumber', contact.phoneNumber);
      // Note: Birthday and Tags are not typically available directly from basic contact info.

      setShowContactPicker(false);
       toast({
         title: t('contactImportedToastTitle'),
         description: t('contactImportedToastDescription', { name: contact.name }),
       });
   };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
        <Button variant="outline" onClick={handleImportFromContacts}>
          <Contact className="ltr:mr-2 rtl:ml-2 h-4 w-4" /> {t('importButton')}
        </Button>
      </div>

      {/* Contact Picker Dialog/Modal */}
      {showContactPicker && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">{t('contactPickerTitle')}</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowContactPicker(false)}>
                 <XIcon className="h-5 w-5" />
              </Button>
            </div>
            {phoneContacts.length > 0 ? (
              <ul className="space-y-2">
                {phoneContacts.map((contact, index) => (
                  <li key={index}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start h-auto py-2"
                      onClick={() => handleSelectContact(contact)}
                    >
                      <div className="ltr:text-left rtl:text-right flex flex-col">
                        <span className="font-medium">{contact.name}</span>
                        {contact.phoneNumber && (
                          <span className="text-xs text-muted-foreground">{contact.phoneNumber}</span>
                        )}
                      </div>
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground text-center">{t('contactPickerNoContacts')}</p>
            )}
          </div>
        </div>
      )}


      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('formFirstNameLabel')}</FormLabel>
                  <FormControl>
                    <div className="relative">
                       <UserPlus className="absolute ltr:left-3 rtl:right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                       <Input placeholder={t('formFirstNamePlaceholder')} {...field} className="ltr:pl-10 rtl:pr-10" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('formLastNameLabel')}</FormLabel>
                  <FormControl>
                     <div className="relative">
                       <UserPlus className="absolute ltr:left-3 rtl:right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                       <Input placeholder={t('formLastNamePlaceholder')} {...field} className="ltr:pl-10 rtl:pr-10" />
                     </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('formPhoneLabel')}</FormLabel>
                <FormControl>
                  <div className="relative">
                     <Phone className="absolute ltr:left-3 rtl:right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                     <Input type="tel" placeholder={t('formPhonePlaceholder')} {...field} className="ltr:pl-10 rtl:pr-10" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="birthday"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>{t('formBirthdayLabel')}</FormLabel>
                {/* Use the new DatePicker component */}
                <DatePicker
                    value={field.value}
                    onChange={field.onChange}
                    disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                    placeholder={t('formBirthdayPlaceholder')}
                    inputClassName={cn(!field.value && 'text-muted-foreground')} // Conditionally style placeholder
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('formTagsLabel')}</FormLabel>
                <FormControl>
                  <div className="relative">
                     <Tags className="absolute ltr:left-3 rtl:right-3 top-3 h-4 w-4 text-muted-foreground" />
                     <Textarea
                        placeholder={t('formTagsPlaceholder')}
                        {...field}
                        className="ltr:pl-10 rtl:pr-10"
                        // Removed dir attribute, let browser handle based on html dir
                      />
                  </div>
                </FormControl>
                 <p className="text-xs text-muted-foreground">{t('formTagsHint')}</p>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto bg-accent hover:bg-accent/90 text-accent-foreground">
             {isSubmitting ? (
                <>
                  {/* Using Lucide's Loader 2 icon */}
                  <svg className="animate-spin ltr:-ml-1 rtl:-mr-1 ltr:mr-3 rtl:ml-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                  </svg>
                  {t('submittingButton')}
                </>
             ) : (
                <> <UserPlus className="ltr:mr-2 rtl:ml-2 h-4 w-4" /> {t('submitButton')} </>
             )}
          </Button>
        </form>
      </Form>
    </div>
  );
}

