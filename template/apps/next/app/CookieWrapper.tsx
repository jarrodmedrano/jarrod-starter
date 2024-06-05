import React, { ReactNode } from 'react'
import { cookies } from 'next/headers'
const CookieWrapper = ({ children }: { children: ReactNode }) => {
  const layout = cookies().get('react-resizable-panels:layout')
  const collapsed = cookies().get('react-resizable-panels:collapsed')

  let defaultLayout: [number?, number?, number?] = []
  let defaultCollapsed = false

  try {
    defaultLayout =
      layout && layout.value !== 'undefined' ? JSON.parse(layout.value) : []
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Invalid JSON in layout.value', e)
  }

  try {
    // eslint-disable-next-line no-console
    console.log('collapsed', collapsed)
    defaultCollapsed =
      collapsed && collapsed.value !== 'undefined'
        ? JSON.parse(collapsed.value)
        : false
  } catch (e) {
    // eslint-disable-next-line no-console
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
