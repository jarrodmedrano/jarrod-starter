'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Logo } from '@ui/components/icons/logo'
import { siteConfig } from '@/config/site'
import { sitemap } from '../../../../../packages/sitemap/sitemap.json'
import { usePageNav } from '../../hooks/use-page-nav'

export function MainNav() {
  const pathname = usePathname()
  const { pages } = usePageNav(sitemap, pathname)

  // eslint-disable-next-line no-console
  console.log('the pages', pages)

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Logo className="h-6 w-6" />

        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <nav className="flex items-center gap-4 text-sm lg:gap-6">{pages}</nav>
    </div>
  )
}
