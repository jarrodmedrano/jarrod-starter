import React, { ReactNode } from 'react'
import { cookies } from 'next/headers'
const CookieWrapper = async ({ children }: { children: ReactNode }) => {
  const layout = (await cookies()).get('react-resizable-panels:layout')
  const collapsed = (await cookies()).get('react-resizable-panels:collapsed')

  let defaultLayout: [number?, number?, number?] = []
  let defaultCollapsed = false

  try {
    defaultLayout =
      layout && layout.value !== 'undefined' ? JSON.parse(layout.value) : []
  } catch (e) {
    console.error('Invalid JSON in layout.value', e)
  }

  try {
    console.log('collapsed', collapsed)
    defaultCollapsed =
      collapsed && collapsed.value !== 'undefined'
        ? JSON.parse(collapsed.value)
        : false
  } catch (e) {
    console.error('Invalid JSON in collapsed.value', e)
  }

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
