'use server'

import { AdapterUser } from '@auth/core/adapters'
import { User } from '@auth/core/types'

import 'server-only'
import { trpc } from './trpc'

export const getUserByEmail = async (email: string): Promise<AdapterUser> => {
  const { data, error } = trpc.getUserByEmail.useQuery({
    email,
  })

  if (error) {
    throw new Error(error.message)
  } else {
    return data
  }
}

export const getUserById = async (id: string): Promise<User> => {
  const { data, error } = trpc.getUserById.useQuery({
    id,
  })

  if (error) {
    throw new Error(error.message)
  } else {
    return data
  }
}
