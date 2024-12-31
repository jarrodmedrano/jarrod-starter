import React, { ElementType, ReactNode, useEffect, useState } from 'react'
import { TooltipProvider } from '../ui/tooltip'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '../ui/resizable'
import { cn } from '@ui/lib/utils'
import { SiteHeader } from '../header/internal/site-header'
import { Sidebar } from './sidebar/sidebar'
import { useCookies } from 'next-client-cookies'

const withDashboard = (Component: ElementType<any>) => {
  const WrappedComponent = ({
    children,
    ...props
  }: {
    children: ReactNode
  }) => {
    const [defaultCollapsed, setDefaultCollapsed] = useState<boolean>(false)
    const [defaultLayout, setDefaultLayout] = useState<[number, number]>([
      265, 440,
    ])
    const cookies = useCookies()

    useEffect(() => {
      const layout = cookies.get('layout')
      const collapsed = cookies.get('collapsed')
      try {
        setDefaultLayout(
          layout && layout !== 'undefined' ? JSON.parse(layout) : [],
        )
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Invalid JSON in layout.value', e)
      }

      try {
        // eslint-disable-next-line no-console
        console.log('collapsed', collapsed)
        setDefaultCollapsed(
          collapsed && collapsed !== 'undefined'
            ? JSON.parse(collapsed)
            : false,
        )
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Invalid JSON in collapsed.value', e)
      }
    }, [cookies])

    //@ts-ignore this line
    const { data } = props

    const [isCollapsed, setIsCollapsed] = useState<boolean>(defaultCollapsed)

    useEffect(() => {
      if (isCollapsed) {
        cookies.set('collapsed', 'true')
      } else {
        cookies.set('collapsed', 'false')
      }
    }, [cookies, isCollapsed])

    const handleCollapse = () => {
      setIsCollapsed(true)
    }

    const handleExpand = () => {
      setIsCollapsed(false)
    }

    return (
      <>
        <SiteHeader />
        <main className="h-screen flex-1">
          <TooltipProvider delayDuration={0}>
            <ResizablePanelGroup
              direction="horizontal"
              onLayout={(sizes: number[]) => {
                cookies.set('layout', JSON.stringify(sizes))
              }}
              className="h-full items-stretch"
            >
              <ResizablePanel
                className={cn(
                  isCollapsed &&
                    'min-w-[50px] transition-all duration-300 ease-in-out',
                )}
                collapsedSize={5}
                collapsible={true}
                defaultSize={15}
                maxSize={20}
                minSize={15}
                onCollapse={handleCollapse}
                onExpand={handleExpand}
              >
                <Sidebar
                  defaultLayout={defaultLayout}
                  isCollapsed={isCollapsed}
                  data={data}
                />
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
                <Component {...props} isCollapsed={isCollapsed} />
                {children}
              </ResizablePanel>
            </ResizablePanelGroup>
          </TooltipProvider>
        </main>
      </>
    )
  }

  return WrappedComponent
}

export default withDashboard
