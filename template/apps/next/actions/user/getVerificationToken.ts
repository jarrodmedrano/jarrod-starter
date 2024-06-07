'use server'
import {
  getVerificationToken,
  GetVerificationTokenArgs,
  GetVerificationTokenRow,
} from '@database'
import pool from '../../app/utils/open-pool'

export default async function fetchVerificationToken(
  args: GetVerificationTokenArgs,
): Promise<GetVerificationTokenRow | null> {
  try {
    const client = await pool.connect()
    try {
      const token = await getVerificationToken(client, args)
      return token
    } finally {
      client.release()
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching user:', error)
    return null
  }
}
