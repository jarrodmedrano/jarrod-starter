import React, { ElementType, ReactComponentElement } from 'react'
import { auth } from '../../auth'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'
import { headers } from 'next/headers'
import { signinRoute } from '../../routes'
import CookieWrapper from '../CookieWrapper'
import { auth as clerkAuth } from '@clerk/nextjs/server'

const withAuth = (Component: ElementType<any>) => {
  const AuthenticatedComponent = async ({
    children,
    ...props
  }: {
    children: ReactComponentElement<any, any>
  }) => {
    const headersList = headers()
    const referer = headersList.get('referer')

    const session = await auth()
    const { userId } = clerkAuth()

    if (referer) {
      const request = new NextRequest(referer)

      if (!session && !userId) {
        const dest = headersList.get('x-invoke-path')
        redirect(`${request.nextUrl.origin}/${signinRoute}?callbackUrl=${dest}`)
      }
    } else {
      if (!session && !userId) {
        redirect(signinRoute)
      }
    }

    return (
      <CookieWrapper>
        <Component session={session} {...props}>
          {children}
        </Component>
      </CookieWrapper>
    )
  }

  return AuthenticatedComponent
}

export default withAuth
