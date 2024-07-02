import { Inbox } from 'lucide-react'
import { ReactNode, useEffect, useState } from 'react'
import { NapPropsLinks, SidebarNav } from '../sidebar-nav'
import { sitemap } from '../../../../../packages/sitemap/sitemap.json'
import { createKeyIndex } from '../utils/build-nav'

export const Sidebar = ({
  isCollapsed,
  data = {},
}: {
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
    <SidebarNav data={data} isCollapsed={isCollapsed} links={collectionsNav} />
  )
}
