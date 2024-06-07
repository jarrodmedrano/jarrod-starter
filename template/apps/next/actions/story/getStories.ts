import {
  ListStoriesForUserArgs,
  ListStoriesForUserRow,
  listStoriesForUser,
} from '@database'
import pool from '../../app/utils/open-pool'

export default async function getStories(
  args: ListStoriesForUserArgs,
): Promise<ListStoriesForUserRow[] | null> {
  const { userid, limit, offset } = args

  try {
    const client = await pool.connect()
    try {
      const args: ListStoriesForUserArgs = { userid, limit, offset }
      const story = await listStoriesForUser(client, args)
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
