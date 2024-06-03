import { createPagesSubNav } from '@ui/components/dashboard/utils/build-nav'
import { createKeyIndex } from '@ui/components/dashboard/utils/build-nav'
import { cn } from '@ui/lib/utils'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@ui/components/ui/tooltip'
import { buttonVariants } from '@ui/components/ui/button'
import { sitemap } from 'sitemap/sitemap.json'
import { ComboBoxResponsive } from '../combobox/comboBoxResponsive'

export const useSidebarNav = (isCollapsed: boolean, data: any) => {
  const [pages, setPages] = useState([])
  useEffect(() => {
    const keyIndex = createKeyIndex(sitemap)
    const reducedPages = createPagesSubNav(keyIndex, 'collections', data)
    setPages(reducedPages)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sitemap, data])

  return {
    pages: pages?.map((page: any, index: any) => {
      return isCollapsed ? (
        <Tooltip key={index} delayDuration={0}>
          <TooltipTrigger asChild>
            <Link
              href="#"
              className={cn(
                buttonVariants({ variant: page.variant, size: 'icon' }),
                'h-9 w-9',
                page.variant === 'default' &&
                  'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white',
              )}
            >
              <page.icon className="h-4 w-4" />
              <span className="sr-only">{page.title}</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right" className="flex items-center gap-4">
            {page.title}
            {page.label && (
              <span className="text-muted-foreground ml-auto">
                {page.label}
              </span>
            )}
          </TooltipContent>
        </Tooltip>
      ) : page?.children ? (
        <ComboBoxResponsive page={page} />
      ) : (
        // <Command>
        //   <CommandInput placeholder="Filter status..." />
        //   <CommandList>
        //     <CommandEmpty>No results found.</CommandEmpty>
        //     <CommandGroup>
        //       {page?.children?.map((status: any) => (
        //         <CommandItem
        //           key={status.value}
        //           value={status.value}
        //           onSelect={(value) => {
        //             // setSelectedStatus(
        //             //   statuses.find((priority) => priority.value === value) || null
        //             // )
        //             setOpen(false)
        //           }}
        //         >
        //           {status.label}
        //         </CommandItem>
        //       ))}
        //     </CommandGroup>
        //   </CommandList>
        // </Command>
        // <DropdownMenu key={page?.title}>
        //   <DropdownMenuTrigger asChild>
        //     <Link
        //       key={page?.title}
        //       href={page?.href}
        //       className={cn(
        //         'hover:text-foreground/80 transition-colors',
        //         pathname === page?.href
        //           ? 'text-foreground'
        //           : 'text-foreground/60',
        //       )}
        //     >
        //       {page?.title}
        //     </Link>
        //   </DropdownMenuTrigger>
        //   <DropdownMenuContent className="w-56">
        //     {page?.children?.map((link: any) => (
        //       <DropdownMenuGroup key={link?.title}>
        //         <DropdownMenuItem
        //           key={link?.title}
        //           className={cn(
        //             'hover:text-foreground/80 transition-colors',
        //             pathname === link?.href
        //               ? 'text-foreground'
        //               : 'text-foreground/60',
        //           )}
        //         >
        //           <Link href={link?.href}>{link?.title}</Link>
        //         </DropdownMenuItem>
        //       </DropdownMenuGroup>
        //     ))}
        //   </DropdownMenuContent>
        // </DropdownMenu>
        <Link
          key={index}
          href="#"
          className={cn(
            buttonVariants({ variant: page.variant, size: 'sm' }),
            page.variant === 'default' &&
              'dark:bg-muted dark:hover:bg-muted dark:text-white dark:hover:text-white',
            'justify-start',
          )}
        >
          <page.icon className="mr-2 h-4 w-4" />
          {page.title}
          {page.label && (
            <span
              className={cn(
                'ml-auto',
                page.variant === 'default' && 'text-background dark:text-white',
              )}
            >
              {page.label}
            </span>
          )}
        </Link>
      )
    }),
  }
}
