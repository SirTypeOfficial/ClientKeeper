'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, UserPlus, Phone, CalendarDays, Tags, Contact, X as XIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
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
import { Textarea } from '@/components/ui/textarea'; // Assuming Textarea component exists for tags
import { getContacts, type Contact as PhoneContact } from '@/services/contacts';


const formSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().optional(),
  phoneNumber: z.string().optional(),
  birthday: z.date().optional(),
  tags: z.string().optional(), // Input as comma-separated string
});

type AddCustomerFormValues = z.infer<typeof formSchema>;

export default function AddCustomerPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [phoneContacts, setPhoneContacts] = React.useState<PhoneContact[]>([]);
  const [showContactPicker, setShowContactPicker] = React.useState(false);

  const form = useForm<AddCustomerFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      tags: '',
    },
  });

  async function onSubmit(values: AddCustomerFormValues) {
    setIsSubmitting(true);
    console.log('Form Values:', values);

    // Simulate API call / Firestore save
    await new Promise(resolve => setTimeout(resolve, 1000));

    // TODO: Replace with actual Firestore save logic
    // Example:
    // const newCustomer: Omit<Customer, 'id' | 'dateAdded'> = {
    //   ...values,
    //   tags: values.tags ? values.tags.split(',').map(tag => tag.trim()).filter(tag => tag) : [],
    //   dateAdded: new Date(),
    // };
    // await addDoc(collection(db, "customers"), newCustomer);

    setIsSubmitting(false);
    toast({
      title: 'Success!',
      description: `${values.firstName} added successfully.`,
      variant: 'default', // Use 'default' which maps to accent color (green) via globals.css potentially
      className: 'bg-accent text-accent-foreground border-accent', // Explicitly style for green
    });
    form.reset(); // Reset form after successful submission
  }

   const handleImportFromContacts = async () => {
    try {
      // TODO: Implement actual permission request for contacts
      const permissionGranted = confirm("Allow Client Keeper to access your contacts?");
      if (!permissionGranted) {
         toast({ title: "Permission Denied", description: "Cannot access contacts without permission.", variant: "destructive" });
         return;
      }

      const contacts = await getContacts(); // Fetch contacts
      setPhoneContacts(contacts);
      setShowContactPicker(true);
    } catch (error) {
       console.error("Failed to fetch contacts:", error);
       toast({ title: "Error", description: "Failed to fetch contacts.", variant: "destructive" });
    }
   };

   const handleSelectContact = (contact: PhoneContact) => {
      // Attempt to split name, fallback to full name in first name
      const nameParts = contact.name.split(' ');
      const firstName = nameParts[0] || contact.name;
      const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

      form.setValue('firstName', firstName);
      form.setValue('lastName', lastName);
      form.setValue('phoneNumber', contact.phoneNumber);
      setShowContactPicker(false);
       toast({
         title: "Contact Imported",
         description: `${contact.name}'s details filled in.`,
       });
   };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Add New Customer</h1>
        <Button variant="outline" onClick={handleImportFromContacts}>
          <Contact className="mr-2 h-4 w-4" /> Import from Contacts
        </Button>
      </div>

      {/* Contact Picker Dialog/Modal */}
      {showContactPicker && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Select Contact</h2>
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
                      className="w-full justify-start"
                      onClick={() => handleSelectContact(contact)}
                    >
                      <div className="text-left">
                        <div>{contact.name}</div>
                        <div className="text-xs text-muted-foreground">{contact.phoneNumber}</div>
                      </div>
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground text-center">No contacts found or unable to load.</p>
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
                  <FormLabel>First Name *</FormLabel>
                  <FormControl>
                    <div className="relative">
                       <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                       <Input placeholder="Enter first name" {...field} className="pl-10" />
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
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                     <div className="relative">
                       <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                       <Input placeholder="Enter last name" {...field} className="pl-10" />
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
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <div className="relative">
                     <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                     <Input type="tel" placeholder="Enter phone number" {...field} className="pl-10" />
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
                <FormLabel>Birthday</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full pl-3 text-left font-normal justify-start',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        <CalendarDays className="mr-2 h-4 w-4" />
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date('1900-01-01')
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <div className="relative">
                     <Tags className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                     <Textarea
                        placeholder="Enter tags, separated by commas (e.g., VIP, New, Referral)"
                        {...field}
                        className="pl-10"
                      />
                  </div>
                </FormControl>
                 <p className="text-xs text-muted-foreground">Separate multiple tags with commas.</p>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto bg-accent hover:bg-accent/90 text-accent-foreground">
             {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Adding...
                </>
             ) : (
                <> <UserPlus className="mr-2 h-4 w-4" /> Add Customer </>
             )}
          </Button>
        </form>
      </Form>
    </div>
  );
}

// Metadata cannot be exported from a Client Component.
// Remove the export below or move it to a Server Component/Layout.
// export const metadata = {
//   title: 'Add Customer - Client Keeper',
//   description: 'Add a new customer to your list.',
// };
