'use server'
import {
  ListCharactersForUserArgs,
  ListCharactersForUserRow,
  listTimelinesForUser,
} from '@repo/database'
import pool from '../../app/utils/open-pool'

export default async function getTimelines(
  args: ListCharactersForUserArgs,
): Promise<ListCharactersForUserRow[] | null> {
  const { userid, limit, offset } = args

  try {
    const client = await pool.connect()
    try {
      const args: ListCharactersForUserArgs = { userid, limit, offset }
      const story = await listTimelinesForUser(client, args)
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
