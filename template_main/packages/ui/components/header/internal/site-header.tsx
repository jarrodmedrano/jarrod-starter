import { Command } from '../../ui/command'
import { MainNav } from '@repo/ui/components/header/internal/main-nav'
import { MobileNav } from '@repo/ui/components/header/internal/mobile-nav'
import { ModeToggle } from '@repo/ui/components/header/internal/mode-toggle'
import { UserButton } from '../userbutton/userbutton'
import { LangButton } from '../langbutton/langbutton'

export function SiteHeader() {
  return (
    <header className="border-border/40 bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur-xs">
      <div className="container flex h-14 max-w-(--breakpoint-2xl) items-center">
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Command />
          </div>
          <nav className="flex items-center">
            <LangButton />
            <ModeToggle />
            <UserButton />
          </nav>
        </div>
      </div>
    </header>
  )
}
