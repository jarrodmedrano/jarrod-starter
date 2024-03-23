import React, { ReactNode } from 'react'
import withAuth from './utils/withAuth'

const AuthWrapper = ({
  children,
  session,
}: {
  children: ReactNode
  session: any
}) => {
  return (
    <>
      {React.Children.map(children, function (child: any) {
        return React.cloneElement(child, { session })
      })}
    </>
  )
}

export default withAuth(AuthWrapper)
