'use server'
import {
  getUserByEmail,
  GetUserByEmailArgs,
  GetUserByEmailRow,
} from '@database'
import pool from '../../app/utils/open-pool'

export default async function fetchUserByEmail(
  args: GetUserByEmailArgs,
): Promise<GetUserByEmailRow | null> {
  const { email: userEmail } = args

  try {
    const client = await pool.connect()
    try {
      const args: GetUserByEmailArgs = { email: userEmail }
      const user = await getUserByEmail(client, args)
      return user
    } finally {
      client.release()
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching user:', error)
    return null
  }
}
