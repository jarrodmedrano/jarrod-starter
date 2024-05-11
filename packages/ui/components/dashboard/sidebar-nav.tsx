'use client'

import { LucideIcon } from 'lucide-react'
import { useSidebarNav } from '../hooks/use-sidebar-nav'

export interface NapPropsLinks {
  title: string
  label?: string
  icon: LucideIcon
  variant: 'default' | 'ghost'
  href: string
}
export interface NavProps {
  isCollapsed: boolean
  links: NapPropsLinks[]
  data: any
}

export function SidebarNav({ isCollapsed, data }: NavProps) {
  const { pages } = useSidebarNav(isCollapsed, data)

  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
    >
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {pages}
      </nav>
    </div>
  )
}
