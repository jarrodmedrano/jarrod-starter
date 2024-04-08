import { ResizablePanel } from '@ui/components/ui/resizable'
import { Separator } from '@radix-ui/react-select'
import { Inbox, User2 } from 'lucide-react'
import { StorySelect } from '../story-select'
import { ReactNode, useEffect, useState } from 'react'
import { cn } from '@ui/lib/utils'
import { NapPropsLinks, Nav } from '../nav'
import { sitemap } from '../../../../../packages/sitemap/sitemap.json'
import { createKeyIndex } from '../utils/build-nav'

export const Sidebar = ({
  session,
  defaultLayout = [265, 440, 655],
  navCollapsedSize = 50,
  isCollapsed,
  setIsCollapsed,
}: {
  session: any
  defaultLayout?: number[]
  defaultCollapsed?: boolean
  navCollapsedSize?: number
  isCollapsed: boolean
  setIsCollapsed: (_isCollapsed: boolean) => void
  children?: ReactNode
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
  // const pages = keys?.reduce((acc: any, curr: any) => {
  //   return sitemap[curr]?.page ? [...acc, sitemap[curr].page] : acc
  // }, [])

  return (
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
      {/* <div
    className={cn(
      'flex h-[52px] items-center justify-center',
      isCollapsed ? 'h-[52px]' : 'px-2',
    )}
  > */}
      {/* {session?.user ? (
      <AccountSwitcher
        isCollapsed={isCollapsed}
        accounts={[
          {
            label: session?.user?.name,
            email: session?.user?.email,
            icon: <User2 size={20} />,
          },
        ]}
      />
    ) : null} */}
      {/* </div> */}
      <Separator />
      <Nav isCollapsed={isCollapsed} links={collectionsNav} />
    </ResizablePanel>
  )
}
