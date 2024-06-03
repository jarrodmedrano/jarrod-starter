'use server'
import {
  getStory as getStoryDb,
  GetStoryArgs,
  GetStoryRow,
} from '@database/dist'
import pool from '../../app/utils/open-pool'

export default async function fetchStory(
  args: GetStoryArgs,
): Promise<GetStoryRow | null> {
  const { id: userId } = args

  try {
    const client = await pool.connect()
    try {
      const args: GetStoryArgs = { id: userId }
      const story = await getStoryDb(client, args)
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
