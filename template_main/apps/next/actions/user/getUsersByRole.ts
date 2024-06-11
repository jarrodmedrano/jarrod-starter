'use server'
import {
  getUsersByRole,
  GetUsersByRoleArgs,
  GetUsersByRoleRow,
} from '@repo/database'
import pool from '../../app/utils/open-pool'

export default async function fetchUserByRole(
  args: GetUsersByRoleArgs,
): Promise<GetUsersByRoleRow[] | null> {
  const { role: userRole, limit = '10', offset = '0' } = args

  try {
    const client = await pool.connect()
    try {
      const args: GetUsersByRoleArgs = {
        role: userRole,
        limit,
        offset,
      }
      const users = await getUsersByRole(client, args)
      return users
    } finally {
      client.release()
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching user:', error)
    return null
  }
}
