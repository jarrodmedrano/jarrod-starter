'use server'
import {
  GetLocationArgs,
  GetLocationRow,
  getLocation as getLocationDb,
} from '@database'
import pool from '../../app/utils/open-pool'

export default async function getLocation(
  args: GetLocationArgs,
): Promise<GetLocationRow | null> {
  const { id: userId } = args

  try {
    const client = await pool.connect()
    try {
      const args: GetLocationArgs = { id: userId }
      const story = await getLocationDb(client, args)
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
