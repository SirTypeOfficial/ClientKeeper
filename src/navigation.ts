import {createLocalizedPathnamesNavigation} from 'next-intl/navigation';

export const locales = ['en', 'fa'] as const;
export const localePrefix = 'always'; // Or 'as-needed'

// The `pathnames` object holds pairs of internal
// and external paths, separated by locale.
export const pathnames = {
  // If all locales use the same pathnames, a single
  // external path can be used for all locales.
  '/': '/',
  '/login': '/login',
  '/add-customer': '/add-customer',
  '/import-export': '/import-export',
  '/settings': '/settings',

  // If locales use different paths, you can
  // specify each external path per locale.
  // '/about': {
  //   en: '/about',
  //   fa: '/about-fa' // Example for Farsi path
  // }

} satisfies Record<string, string | Record<(typeof locales)[number], string>>;

export const {Link, redirect, usePathname, useRouter} =
  createLocalizedPathnamesNavigation({locales, localePrefix, pathnames});
