import { ResizablePanel } from '@ui/components/ui/resizable'
import { Separator } from '@radix-ui/react-select'
import { Inbox, User2 } from 'lucide-react'
import { StorySelect } from '../story-select'
import { ReactNode, useEffect, useState } from 'react'
import { cn } from '@ui/lib/utils'
import { NapPropsLinks, SidebarNav } from '../sidebar-nav'
import { sitemap } from '../../../../../packages/sitemap/sitemap.json'
import { createKeyIndex } from '../utils/build-nav'

export const Sidebar = ({
  session,
  defaultLayout = [265, 440, 655],
  navCollapsedSize = 50,
  isCollapsed,
  setIsCollapsed,
  data = {},
}: {
  session: any
  defaultLayout?: number[]
  defaultCollapsed?: boolean
  navCollapsedSize?: number
  isCollapsed: boolean
  setIsCollapsed: (_isCollapsed: boolean) => void
  children?: ReactNode
  data?: any
}) => {
  const [collectionsNav, setCollectionsNav] = useState<NapPropsLinks[]>([])

  useEffect(() => {
    const keyIndex = createKeyIndex(sitemap)
    setCollectionsNav(
      keyIndex?.collections?.map((link: any) => {
        return {
          ...link,
          title: link.name,
          label: link.label,
          icon: Inbox,
          variant: 'ghost',
          href: link.loc,
        }
      }),
    )

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ResizablePanel
      defaultSize={defaultLayout[0]}
      collapsedSize={navCollapsedSize}
      collapsible={true}
      minSize={15}
      maxSize={20}
      //@ts-ignore this line
      onCollapse={(collapsed) => {
        setIsCollapsed(collapsed)
        document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
          collapsed,
        )}`
      }}
      className={cn(
        isCollapsed && 'min-w-[50px] transition-all duration-300 ease-in-out',
      )}
    >
      <StorySelect
        isCollapsed={isCollapsed}
        accounts={[
          {
            label: session?.user?.name,
            email: session?.user?.email,
            icon: <User2 />,
          },
        ]}
      />
      <Separator />
      <SidebarNav
        data={data}
        isCollapsed={isCollapsed}
        links={collectionsNav}
      />
    </ResizablePanel>
  )
}
