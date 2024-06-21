import { Command } from '@/components/ui/command'
import { MainNav } from '@ui/components/header/internal/main-nav'
import { MobileNav } from '@ui/components/header/internal/mobile-nav'
import { ModeToggle } from '@ui/components/header/internal/mode-toggle'
import UserDropdown from '../loginbutton/user-dropdown'

export function SiteHeader({
  session,
  signOut,
}: {
  session: any
  signOut: () => void
}) {
  return (
    <header className="border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Command />
          </div>
          <nav className="flex items-center">
            <ModeToggle />
            {session?.user ? (
              <UserDropdown user={session.user} logOut={signOut} />
            ) : (
              <a
                href="/signin"
                className="text-sm font-semibold leading-6 text-white"
              >
                Log in <span aria-hidden="true">&rarr;</span>
              </a>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
