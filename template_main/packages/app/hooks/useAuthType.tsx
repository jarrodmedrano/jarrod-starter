import { useUser } from '@clerk/nextjs'
import { useSession } from 'next-auth/react'

export const useAuthType = (authType: string): any => {
  const { user: clerkUser } = useUser()
  const { data: session } = useSession()

  if (authType === 'clerk') {
    return {
      user: clerkUser,
    }
  }
  if (authType === 'nextauth') {
    return {
      user: session?.user,
    }
  }
  return null
}
