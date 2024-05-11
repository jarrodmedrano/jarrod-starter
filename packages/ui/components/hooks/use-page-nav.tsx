import { createPagesSubNav } from '@ui/components/dashboard/utils/build-nav'
import { createKeyIndex } from '@ui/components/dashboard/utils/build-nav'
import { cn } from '@ui/lib/utils'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
export const usePageNav = (sitemap: any, pathname: string) => {
  const [pages, setPages] = useState([])
  useEffect(() => {
    const keyIndex = createKeyIndex(sitemap)
    const reducedPages = createPagesSubNav(keyIndex, 'pages', {})
    setPages(reducedPages)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    pages: pages?.map((page: any) => {
      return page?.children ? (
        <DropdownMenu key={page?.title}>
          <DropdownMenuTrigger asChild>
            <Link
              key={page?.title}
              href={page?.href}
              className={cn(
                'hover:text-foreground/80 transition-colors',
                pathname === page?.href
                  ? 'text-foreground'
                  : 'text-foreground/60',
              )}
            >
              {page?.title}
            </Link>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            {page?.children?.map((link: any) => (
              <DropdownMenuGroup key={link?.title}>
                <a href={`${link?.href}`}>
                  <DropdownMenuItem>{link?.title}</DropdownMenuItem>
                </a>
              </DropdownMenuGroup>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link
          key={page?.title}
          href={page?.href}
          className={cn(
            'hover:text-foreground/80 transition-colors',
            pathname === page?.href ? 'text-foreground' : 'text-foreground/60',
          )}
        >
          {page?.title}
        </Link>
      )
    }),
  }
}
