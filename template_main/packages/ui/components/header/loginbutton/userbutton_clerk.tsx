'use client'
import UserDropdown from './user-dropdown'
import { signOut } from 'next-auth/react'
import { Clerk } from '@clerk/clerk-js'

// Initialize Clerk with your Clerk publishable key
const clerk = new Clerk('pk_test_Z3Jvd24tcGlnLTgwLmNsZXJrLmFjY291bnRzLmRldiQ')

export const UserButton = () => {
  clerk.load()

  return clerk?.user ? (
    <UserDropdown user={clerk.user} logOut={signOut} />
  ) : (
    <a href="/signin" className="text-sm font-semibold leading-6 text-white">
      Log in <span aria-hidden="true">&rarr;</span>
    </a>
  )
}
