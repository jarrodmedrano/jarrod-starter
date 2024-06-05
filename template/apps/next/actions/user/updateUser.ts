'use server'
import {
  updateUser as updateUserDB,
  GetUserRow,
  UpdateUserArgs,
} from '@database/dist'
import pool from '../../app/utils/open-pool'

export default async function updateUser(
  args: UpdateUserArgs,
): Promise<GetUserRow | null> {
  try {
    const client = await pool.connect()
    try {
      const account = await updateUserDB(client, args)
      return account
    } finally {
      client.release()
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching user:', error)
    return null
  }
}
