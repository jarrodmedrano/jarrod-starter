import createIntlMiddleware from 'next-intl/middleware';
import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextRequest, NextFetchEvent } from 'next/server';
import { intlConfig, pipedString } from './i18n';

// Create the middleware for next-intl
const intlMiddleware = createIntlMiddleware(intlConfig);

// Combine both middlewares
export default function combinedMiddleware(req: NextRequest, res: NextFetchEvent) {
  // Execute the intl middleware first
  const intlResponse = intlMiddleware(req);
  if (intlResponse) {
    return intlResponse;
  }

  // Execute the Clerk middleware
  return clerkMiddleware()(req, res);
}

// Combine the matcher configurations
export const config = {
  matcher: [
    '/',
    `/(${pipedString})/:path*`,
    '/((?!.*\\..*|_next).*)',
    '/(api|trpc)(.*)',
  ],
};
