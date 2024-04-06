'use client'

import Link from 'next/link'
import { LucideIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { buttonVariants } from '../ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '../ui/dropdown-menu'

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
}

export function Nav({ links, isCollapsed }: NavProps) {
  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
    >
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links.map((link, index) =>
          isCollapsed ? (
            <Tooltip key={index} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className={cn(
                    buttonVariants({ variant: link.variant, size: 'icon' }),
                    'h-9 w-9',
                    link.variant === 'default' &&
                      'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white',
                  )}
                >
                  <link.icon className="h-4 w-4" />
                  <span className="sr-only">{link.title}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="flex items-center gap-4">
                {link.title}
                {link.label && (
                  <span className="text-muted-foreground ml-auto">
                    {link.label}
                  </span>
                )}
              </TooltipContent>
            </Tooltip>
          ) : (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>test</DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>{link?.title}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <a href={`/user/${link?.href}`}>
                      <DropdownMenuItem>Profile</DropdownMenuItem>
                    </a>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuSeparator />
                </DropdownMenuContent>
              </DropdownMenu>
              <Link
                key={index}
                href="#"
                className={cn(
                  buttonVariants({ variant: link.variant, size: 'sm' }),
                  link.variant === 'default' &&
                    'dark:bg-muted dark:hover:bg-muted dark:text-white dark:hover:text-white',
                  'justify-start',
                )}
              >
                <link.icon className="mr-2 h-4 w-4" />
                {link.title}
                {link.label && (
                  <span
                    className={cn(
                      'ml-auto',
                      link.variant === 'default' &&
                        'text-background dark:text-white',
                    )}
                  >
                    {link.label}
                  </span>
                )}
              </Link>
            </>
          ),
        )}
      </nav>
    </div>
  )
}

// export interface NapPropsLinks {
//   title: string
//   label?: string
//   icon: LucideIcon
//   variant: 'default' | 'ghost'
//   href: string
// }
// export interface NavProps {
//   isCollapsed: boolean
//   links: NapPropsLinks[]
// }

// export function Nav({ links, isCollapsed }: NavProps) {
//   return (
//     <div
//       data-collapsed={isCollapsed}
//       className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
//     >
//       <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
//         {links?.map((link, index) => (
//           <DropdownMenu key={index}>
//             <DropdownMenuTrigger asChild></DropdownMenuTrigger>
//             <DropdownMenuContent className="w-56">
//               <DropdownMenuSeparator />
//               <DropdownMenuLabel>{link.title}</DropdownMenuLabel>

//               <DropdownMenuGroup key={index}>
//                 <a href={`/user/${link?.href}`}>
//                   <DropdownMenuItem>{link.title}</DropdownMenuItem>
//                 </a>
//               </DropdownMenuGroup>
//               <DropdownMenuSeparator />
//               <DropdownMenuGroup>
//                 <DropdownMenuSub>
//                   <DropdownMenuSubTrigger>Create New</DropdownMenuSubTrigger>
//                   <DropdownMenuPortal>
//                     <DropdownMenuSubContent>
//                       <DropdownMenuSeparator />
//                       <a href={`/create/`}>
//                         <DropdownMenuItem>More...</DropdownMenuItem>
//                       </a>
//                     </DropdownMenuSubContent>
//                   </DropdownMenuPortal>
//                 </DropdownMenuSub>
//               </DropdownMenuGroup>
//               <DropdownMenuSeparator />
//             </DropdownMenuContent>
//           </DropdownMenu>
//         ))}
//       </nav>
//     </div>
//   )
// }

// ;<nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
//   {links.map((link, index) =>
//     isCollapsed ? (
//       <Tooltip key={index} delayDuration={0}>
//         <TooltipTrigger asChild>
//           <Link
//             href="#"
//             className={cn(
//               buttonVariants({ variant: link.variant, size: 'icon' }),
//               'h-9 w-9',
//               link.variant === 'default' &&
//                 'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white',
//             )}
//           >
//             <link.icon className="h-4 w-4" />
//             <span className="sr-only">{link.title}</span>
//           </Link>
//         </TooltipTrigger>
//         <TooltipContent side="right" className="flex items-center gap-4">
//           {link.title}
//           {link.label && (
//             <span className="text-muted-foreground ml-auto">{link.label}</span>
//           )}
//         </TooltipContent>
//       </Tooltip>
//     ) : (
//       <DropdownMenuGroup>
//         <Link
//           key={index}
//           href="#"
//           className={cn(
//             buttonVariants({ variant: link.variant, size: 'sm' }),
//             link.variant === 'default' &&
//               'dark:bg-muted dark:hover:bg-muted dark:text-white dark:hover:text-white',
//             'justify-start',
//           )}
//         >
//           <link.icon className="mr-2 h-4 w-4" />
//           {link.title}
//           {link.label && (
//             <span
//               className={cn(
//                 'ml-auto',
//                 link.variant === 'default' && 'text-background dark:text-white',
//               )}
//             >
//               {link.label}
//             </span>
//           )}
//         </Link>
//         <DropdownMenuSub>
//           <DropdownMenuSubTrigger>Create New</DropdownMenuSubTrigger>
//           <DropdownMenuPortal>
//             <DropdownMenuSubContent>
//               <DropdownMenuSeparator />
//             </DropdownMenuSubContent>
//           </DropdownMenuPortal>
//         </DropdownMenuSub>
//       </DropdownMenuGroup>
//     ),
//   )}
// </nav>
