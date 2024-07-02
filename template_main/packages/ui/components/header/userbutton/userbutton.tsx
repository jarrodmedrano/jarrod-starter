'use client'
import UserDropdown from './user-dropdown'
import { signOut } from 'next-auth/react'
import { useAuthType } from '@ui/components/hooks/useAuthType'

export const UserButton = () => {
  const { user } = useAuthType(process.env.authtype || 'clerk')

  return user ? (
    <UserDropdown user={user} logOut={signOut} />
  ) : (
    <a href="/signin" className="text-sm font-semibold leading-6 text-white">
      Log in <span aria-hidden="true">&rarr;</span>
    </a>
  )
}
