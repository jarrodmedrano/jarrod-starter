'use server'
import {
  listLocationsForUser,
  ListLocationsForUserArgs,
  ListLocationsForUserRow,
} from '@repo/database'
import pool from '../../app/utils/open-pool'

export default async function getLocations(
  args: ListLocationsForUserArgs,
): Promise<ListLocationsForUserRow[] | null> {
  const { userid, limit, offset } = args

  try {
    const client = await pool.connect()
    try {
      const args: ListLocationsForUserArgs = { userid, limit, offset }
      const story = await listLocationsForUser(client, args)
      return story
    } finally {
      client.release()
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching user:', error)
    return null
  }
}
