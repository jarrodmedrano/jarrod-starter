'use server'
import {
  GetCharacterArgs,
  GetCharacterRow,
  getCharacter as getCharacterDb,
} from '@repo/database'
import pool from '../../app/utils/open-pool'

export default async function getCharacter(
  args: GetCharacterArgs,
): Promise<GetCharacterRow | null> {
  const { id: userId } = args

  try {
    const client = await pool.connect()
    try {
      const args: GetCharacterArgs = { id: userId }
      const story = await getCharacterDb(client, args)
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
