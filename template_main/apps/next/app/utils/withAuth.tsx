import React, { ElementType, ReactComponentElement } from 'react'
import { auth } from '../../auth'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'
import { headers } from 'next/headers'
import { signinRoute } from '../../routes'
import CookieWrapper from '../CookieWrapper'

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

    if (referer) {
      const request = new NextRequest(referer)

      if (process.env.AUTH_TYPE === 'nextauth' && !session) {
        const dest = headersList.get('x-invoke-path')
        redirect(`${request.nextUrl.origin}/${signinRoute}?callbackUrl=${dest}`)
      }
    } else {
      if (process.env.AUTH_TYPE === 'nextauth' && !session) {
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
