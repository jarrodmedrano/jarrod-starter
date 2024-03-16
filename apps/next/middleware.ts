// import NextAuth from 'next-auth'
// import { NextResponse } from 'next/server'

import { NextAuthRequest } from 'next-auth/lib'
import { NextResponse } from 'next/server'

// import { authConfig } from './auth'
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from './routes'
// import { auth } from './auth'
// import { NextAuthRequest } from 'next-auth/lib'

// const { auth } = NextAuth(authConfig)

// export default auth((req: NextAuthRequest): Response | Promise<Response> => {
//   const { nextUrl } = req
//   const isLoggedIn = !!req.auth

//   const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
//   const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
//   const isAuthRoute = authRoutes.includes(nextUrl.pathname)

//   if (isApiAuthRoute) {
//     return NextResponse.next()
//   }

//   if (isAuthRoute) {
//     if (isLoggedIn) {
//       return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
//     }
//     return NextResponse.next()
//   }

//   if (!isLoggedIn && !isPublicRoute) {
//     let callbackUrl = nextUrl.pathname
//     if (nextUrl.search) {
//       callbackUrl += nextUrl.search
//     }

//     const encodedCallbackUrl = encodeURIComponent(callbackUrl)

//     return Response.redirect(
//       new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl),
//     )
//   }

//   return NextResponse.next()
// })
export async function middleware(req: NextAuthRequest): Promise<Response> {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  // // eslint-disable-next-line no-console
  // console.log('request', req)
  // // eslint-disable-next-line no-console
  // console.log('reqiest auth', req.auth)
  // // eslint-disable-next-line no-console
  // console.log('next url', nextUrl)

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)

  if (isApiAuthRoute) {
    return NextResponse.next()
  }

  if (isApiAuthRoute) {
    return NextResponse.next()
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }
    return NextResponse.next()
  }

  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname
    if (nextUrl.search) {
      callbackUrl += nextUrl.search
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl)

    return Response.redirect(
      new URL(`/signin?callbackUrl=${encodedCallbackUrl}`, nextUrl),
    )
  }

  return NextResponse.next()
}
// Optionally, don't invoke Middleware on some paths
// export const config = {
//   matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
// }
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
