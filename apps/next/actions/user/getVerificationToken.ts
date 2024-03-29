'use server'
import {
  getVerificationToken,
  GetVerificationTokenArgs,
  GetVerificationTokenRow,
} from 'database'
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