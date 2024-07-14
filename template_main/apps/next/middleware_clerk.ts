import { clerkMiddleware } from '@clerk/nextjs/server'
import { NextRequest, NextFetchEvent } from 'next/server'

// Combine both middlewares
export default function combinedMiddleware(
  req: NextRequest,
  res: NextFetchEvent,
) {
  // Execute the Clerk middleware
  return clerkMiddleware()(req, res)
}

// Combine the matcher configurations
export const config = {
  matcher: ['/', '/((?!.*\\..*|_next).*)', '/(api|trpc)(.*)'],
}
