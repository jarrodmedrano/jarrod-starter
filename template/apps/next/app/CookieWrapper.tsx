import React, { ReactNode } from 'react'
import { cookies } from 'next/headers'
const CookieWrapper = ({ children }: { children: ReactNode }) => {
  const layout = cookies().get('react-resizable-panels:layout')
  const collapsed = cookies().get('react-resizable-panels:collapsed')

  const defaultLayout = layout ? JSON.parse(layout.value) : undefined
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined

  return (
    <>
      {React.Children.map(children, function (child: any) {
        return React.cloneElement(child, {
          defaultLayout,
          defaultCollapsed,
        })
      })}
    </>
  )
}

export default CookieWrapper
