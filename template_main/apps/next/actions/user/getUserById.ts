'use server'
import { getUser, GetUserArgs, GetUserRow } from '@repo/database'
import pool from '../../app/utils/open-pool'

export default async function fetchUser(
  args: GetUserArgs,
): Promise<GetUserRow | null> {
  const { id: userId } = args

  try {
    const client = await pool.connect()
    try {
      const args: GetUserArgs = { id: userId }
      const user = await getUser(client, args)
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
