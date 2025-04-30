import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css'; // Adjust path
import { Toaster } from '@/components/ui/toaster';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server'; // Import getTranslations

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

// Can be imported from a shared config
const locales = ['en', 'fa'];

// Function to generate metadata based on locale
export async function generateMetadata({params: {locale}}: {params: {locale: string}}): Promise<Metadata> {
  if (!locales.includes(locale)) notFound(); // Validate locale

  // Use dynamic import for messages (This part is fine)
  let messages;
  try {
      messages = (await import(`../../../messages/${locale}.json`)).default;
  } catch (error) {
      console.error("Failed to load messages for locale:", locale, error);
       // Fallback metadata if messages fail to load
      return {
           title: 'Client Keeper',
           description: 'Manage your customer information efficiently.',
      };
  }

  // Use getTranslations to get specific message keys for metadata
  // Note: getTranslations needs the locale and namespace
  const t = await getTranslations({ locale, namespace: 'AppLayout' });
  const tCustomers = await getTranslations({ locale, namespace: 'CustomersPage'});

  const appName = t('appName') || 'Client Keeper';
  const description = tCustomers('pageDescription') || 'Manage your customer information efficiently.';

  return {
    title: {
      template: `%s | ${appName}`,
      default: appName,
    },
    description: description,
  };
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
