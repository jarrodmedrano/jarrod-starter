import React, { ElementType, ReactNode, useState } from 'react'
import { TooltipProvider } from '../ui/tooltip'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '../ui/resizable'
import { Separator } from '@radix-ui/react-select'
import { Nav } from '../dashboard/nav'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { AccountSwitcher } from '../dashboard/account-switcher'
import { cn } from '@ui/lib/utils'
import {
  AlertCircle,
  Archive,
  File,
  Inbox,
  MessagesSquare,
  Send,
  ShoppingCart,
  Trash2,
  Users2,
} from 'lucide-react'
import { Input } from '../ui/input'
import { Search } from '../search/search'
import { SiteHeader } from '../header/internal/site-header'

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
    // // eslint-disable-next-line no-console
    // console.log('the wrapper props', defaultLayout)

    const [isCollapsed, setIsCollapsed] = useState<boolean>(defaultCollapsed)

    // const handleCollapse = (isCollapsed): void => {
    //   setIsCollapsed(isCollapsed)
    //   document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
    //     isCollapsed,
    //   )}`
    // }

    return (
      <>
        <SiteHeader />
        <main className="flex-1">
          <TooltipProvider delayDuration={0}>
            <ResizablePanelGroup
              direction="horizontal"
              onLayout={(sizes: number[]) => {
                document.cookie = `react-resizable-panels:layout=${JSON.stringify(
                  sizes,
                )}`
              }}
              className="h-full max-h-[800px] items-stretch"
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
                <div
                  className={cn(
                    'flex h-[52px] items-center justify-center',
                    isCollapsed ? 'h-[52px]' : 'px-2',
                  )}
                >
                  <AccountSwitcher
                    isCollapsed={isCollapsed}
                    accounts={[
                      {
                        label: 'Account 1',
                        email: 'XVj9H@example.com',
                        icon: <MessagesSquare size={20} />,
                      },
                    ]}
                  />
                </div>
                <Separator />
                <Nav
                  isCollapsed={isCollapsed}
                  links={[
                    {
                      title: 'Inbox',
                      label: '128',
                      icon: Inbox,
                      variant: 'default',
                    },
                    {
                      title: 'Drafts',
                      label: '9',
                      icon: File,
                      variant: 'ghost',
                    },
                    {
                      title: 'Sent',
                      label: '',
                      icon: Send,
                      variant: 'ghost',
                    },
                    {
                      title: 'Trash',
                      label: '',
                      icon: Trash2,
                      variant: 'ghost',
                    },
                    {
                      title: 'Archive',
                      label: '',
                      icon: Archive,
                      variant: 'ghost',
                    },
                  ]}
                />
                <Separator />
                <Nav
                  isCollapsed={isCollapsed}
                  links={[
                    {
                      title: 'Social',
                      label: '972',
                      icon: Users2,
                      variant: 'ghost',
                    },
                    {
                      title: 'Updates',
                      label: '342',
                      icon: AlertCircle,
                      variant: 'ghost',
                    },
                    {
                      title: 'Forums',
                      label: '128',
                      icon: MessagesSquare,
                      variant: 'ghost',
                    },
                    {
                      title: 'Shopping',
                      label: '8',
                      icon: ShoppingCart,
                      variant: 'ghost',
                    },
                    {
                      title: 'Promotions',
                      label: '21',
                      icon: Archive,
                      variant: 'ghost',
                    },
                  ]}
                />
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
                <Tabs defaultValue="all">
                  <div className="flex items-center px-4 py-2">
                    <h1 className="text-xl font-bold">Inbox</h1>
                    <TabsList className="ml-auto">
                      <TabsTrigger
                        value="all"
                        className="text-zinc-600 dark:text-zinc-200"
                      >
                        All mail
                      </TabsTrigger>
                      <TabsTrigger
                        value="unread"
                        className="text-zinc-600 dark:text-zinc-200"
                      >
                        Unread
                      </TabsTrigger>
                    </TabsList>
                  </div>
                  <Separator />
                  <div className="bg-background/95 supports-[backdrop-filter]:bg-background/60 p-4 backdrop-blur">
                    <form>
                      <div className="relative">
                        <Search className="text-muted-foreground absolute left-2 top-2.5 h-4 w-4" />
                        <Input placeholder="Search" className="pl-8" />
                      </div>
                    </form>
                  </div>
                  <TabsContent value="all" className="m-0">
                    {/* <MailList items={mails} /> */}
                  </TabsContent>
                  <TabsContent value="unread" className="m-0">
                    {/* <MailList items={mails.filter((item) => !item.read)} /> */}
                  </TabsContent>
                </Tabs>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={defaultLayout[2]}>
                <Component {...props} isCollapsed={isCollapsed} />
                {React.Children.map(children, function (child: any) {
                  return React.cloneElement(child, {
                    defaultLayout,
                    defaultCollapsed,
                  })
                })}
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
