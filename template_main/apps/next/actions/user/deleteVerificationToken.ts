'use server'
import {
  deleteVerificationToken,
  DeleteVerificationTokenArgs,
} from '@repo/database'
import pool from '../../app/utils/open-pool'

export default async function deleteToken(
  args: DeleteVerificationTokenArgs,
): Promise<void> {
  try {
    const client = await pool.connect()
    try {
      await deleteVerificationToken(client, args)
      return
    } finally {
      client.release()
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error deleting token:', error)
  }
}
