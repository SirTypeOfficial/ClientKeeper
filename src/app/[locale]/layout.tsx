import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css'; // Adjust path
import { Toaster } from '@/components/ui/toaster';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { notFound } from 'next/navigation';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

// Can be imported from a shared config
const locales = ['en', 'fa'];

// Function to generate metadata based on locale
export async function generateMetadata({params: {locale}}: {params: {locale: string}}): Promise<Metadata> {
  if (!locales.includes(locale)) notFound(); // Validate locale

  // Use dynamic import for messages
  try {
      const messages = (await import(`../../../messages/${locale}.json`)).default;
       // Dynamically generate title and description based on locale messages
      const appName = messages.AppLayout?.appName || 'Client Keeper';
      const description = messages.CustomersPage?.pageDescription || 'Manage your customer information efficiently.';

      return {
        title: {
          template: `%s | ${appName}`,
          default: appName,
        },
        description: description,
      };
  } catch (error) {
      console.error("Failed to load messages for locale:", locale, error);
       // Fallback metadata if messages fail to load
      return {
           title: 'Client Keeper',
           description: 'Manage your customer information efficiently.',
      };
  }

}

export default function LocaleLayout({
  children,
  params: {locale}
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  // Validate locale
  if (!locales.includes(locale)) notFound();

  const messages = useMessages();

  return (
    <html lang={locale} dir={locale === 'fa' ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
