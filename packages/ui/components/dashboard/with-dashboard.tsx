import React, { ElementType, ReactNode, useState } from 'react'
import { TooltipProvider } from '../ui/tooltip'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '../ui/resizable'
import { cn } from '@ui/lib/utils'
import { SiteHeader } from '../header/internal/site-header'
import { Sidebar } from './sidebar/sidebar'

const withDashboard = (Component: ElementType<any>) => {
  const WrappedComponent = ({
    children,
    defaultLayout = [265, 440, 655],
    defaultCollapsed = false,
    navCollapsedSize = 50,
    ...props
  }: {
    children: ReactNode
    defaultLayout?: number[]
    defaultCollapsed?: boolean
    navCollapsedSize?: number
  }) => {
    //@ts-ignore this line
    const { session, data } = props
    // eslint-disable-next-line no-console
    console.log('the wrapper props', props)

    const [isCollapsed, setIsCollapsed] = useState<boolean>(defaultCollapsed)

    // const handleCollapse = (isCollapsed): void => {
    //   setIsCollapsed(isCollapsed)
    //   document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
    //     isCollapsed,
    //   )}`
    // }

    return (
      <>
        <SiteHeader session={session} signOut={() => {}} />
        <main className="h-screen flex-1">
          <TooltipProvider delayDuration={0}>
            <ResizablePanelGroup
              direction="horizontal"
              onLayout={(sizes: number[]) => {
                document.cookie = `react-resizable-panels:layout=${JSON.stringify(
                  sizes,
                )}`
              }}
              className="h-full items-stretch"
            >
              <ResizablePanel
                defaultSize={defaultLayout[0]}
                collapsedSize={navCollapsedSize}
                collapsible={true}
                minSize={15}
                maxSize={20}
                //@ts-ignore this line
                onCollapse={(collapsed) => {
                  // eslint-disable-next-line no-console
                  // console.log('the wrapper props', collapsed)

                  setIsCollapsed(collapsed)
                  document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
                    collapsed,
                  )}`
                }}
                className={cn(
                  isCollapsed &&
                    'min-w-[50px] transition-all duration-300 ease-in-out',
                )}
              >
                <Sidebar
                  defaultLayout={defaultLayout}
                  session={session}
                  isCollapsed={isCollapsed}
                  setIsCollapsed={function (_isCollapsed: boolean): void {
                    throw new Error('Function not implemented.')
                  }}
                  data={data}
                />
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
                <Component {...props} isCollapsed={isCollapsed} />
                {children}
              </ResizablePanel>
              <ResizableHandle withHandle />
            </ResizablePanelGroup>
          </TooltipProvider>
        </main>
      </>
    )
  }

  return WrappedComponent
}

export default withDashboard
