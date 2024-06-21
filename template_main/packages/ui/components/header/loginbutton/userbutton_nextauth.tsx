'use client'
import { useSession } from 'next-auth/react'
import UserDropdown from './user-dropdown'
import { signOut } from 'next-auth/react'

export const UserButton = () => {
  const { data: session } = useSession()

  return session?.user ? (
    <UserDropdown user={session.user} logOut={signOut} />
  ) : (
    <a href="/signin" className="text-sm font-semibold leading-6 text-white">
      Log in <span aria-hidden="true">&rarr;</span>
    </a>
  )
}
