import {getRequestConfig} from 'next-intl/server';
import {notFound} from 'next/navigation';

// Can be imported from a shared config
const locales = ['en', 'fa'];

export default getRequestConfig(async ({locale}) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  let messages;
  try {
    messages = (await import(`../messages/${locale}.json`)).default;
  } catch (error) {
     console.error("Failed to load messages for locale:", locale, error);
     // Optionally handle the error, e.g., by returning fallback messages
     // For now, we'll let it potentially fail if messages are crucial
     notFound(); // Or handle differently if you have fallback logic
  }

  return {
    locale: locale, // Add the locale property
    messages: messages
  };
});
