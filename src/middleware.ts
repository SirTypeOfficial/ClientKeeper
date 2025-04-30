import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

const locales = ['en', 'fa'];
const publicPages = ['/login']; // Pages accessible without authentication

const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: locales,

  // Used when no locale matches
  defaultLocale: 'en'
});

export default function middleware(request: NextRequest) {
  const publicPathnameRegex = RegExp(
    `^(/(${locales.join('|')}))?(${publicPages.flatMap((p) => (p === '/' ? ['', '/'] : p)).join('|')})/?$`,
    'i'
  );
  const isPublicPage = publicPathnameRegex.test(request.nextUrl.pathname);

  // Apply next-intl middleware first
  const intlResponse = intlMiddleware(request);

  // Check authentication status
  const isAuthenticated = request.cookies.get('auth_token')?.value === 'mock-token'; // Replace with real check
  const { pathname } = request.nextUrl;

  // Redirect to login if not authenticated and accessing a protected page
  if (!isAuthenticated && !isPublicPage) {
    // Construct login URL with locale prefix if it exists
    const localePrefix = locales.find(loc => pathname.startsWith(`/${loc}/`)) || '';
    const loginUrl = new URL(`${localePrefix}/login`, request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect to home if authenticated and trying to access login page
  if (isAuthenticated && isPublicPage && pathname.includes('/login')) {
     // Construct home URL with locale prefix if it exists
     const localePrefix = locales.find(loc => pathname.startsWith(`/${loc}/`)) || '';
     return NextResponse.redirect(new URL(`${localePrefix}/`, request.url));
  }

  // Return the response from next-intl middleware (handles locale redirection etc.)
  return intlResponse;
}


export const config = {
  // Match only internationalized pathnames
   matcher: [
    // Enable a redirect to `/` when a locale is matched
    '/',

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    '/(en|fa)/:path*',

     // Match all request paths except for the ones starting with:
     // - api (API routes)
     // - _next/static (static files)
     // - _next/image (image optimization files)
     // - favicon.ico (favicon file)
     '/((?!api|_next/static|_next/image|favicon.ico).*)'
   ],
};
