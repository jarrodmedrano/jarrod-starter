import React, { ElementType, ReactComponentElement } from 'react'
import { auth } from '../../auth'
import { redirect } from 'next/navigation'

const withAuth = (Component: ElementType<any>) => {
  const AuthenticatedComponent = async ({
    children,
  }: {
    children: ReactComponentElement<any, any>
  }) => {
    const session = await auth()

    if (!session) {
      redirect('/signin')
    } else {
      return <Component session={session}>{children}</Component>
    }
  }

  return AuthenticatedComponent
}

export default withAuth
