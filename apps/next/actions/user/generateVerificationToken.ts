import { v4 as uuidv4 } from 'uuid'
import fetchVerificationToken from './getVerificationToken'
import { createVerificationToken, deleteVerificationToken } from 'database'
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

export const generateVerificationToken = async (
  email: string,
): Promise<string> => {
  const token = uuidv4()
  const expires = new Date(new Date().getTime() + 3600 * 1000)

  const existingToken = await fetchVerificationToken({
    token,
  })

  if (existingToken) {
    await deleteVerificationToken(pool, {
      identifier: email,
    })
  }

  await createVerificationToken(pool, {
    identifier: email,
    token,
    expires,
  })

  return token
}
