'use server'
import { getUsersByRole, GetUsersByRoleArgs, GetUsersByRoleRow } from 'database'
import { Pool } from 'pg'

const pool = new Pool({
  host: process.env.DATABASE_HOST || 'postgres12',
  user: process.env.DATABASE_USER || 'root',
  port: 5498,
  password: process.env.DATABASE_SECRET || 'secret',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  database: process.env.DATABASE_NAME || 'starter-app',
})

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
