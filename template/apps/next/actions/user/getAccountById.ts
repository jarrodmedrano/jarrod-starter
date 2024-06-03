'use server'
import { getAccount, GetAccountArgs, GetAccountRow } from '@database/dist'
import pool from '../../app/utils/open-pool'

export default async function fetchAccount(
  args: GetAccountArgs,
): Promise<GetAccountRow | null> {
  const { id: userId } = args

  try {
    const client = await pool.connect()
    try {
      const args: GetAccountArgs = { id: userId }
      const account = await getAccount(client, args)
      return account
    } finally {
      client.release()
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching user:', error)
    return null
  }
}
