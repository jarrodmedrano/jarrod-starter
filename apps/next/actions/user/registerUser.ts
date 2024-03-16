'use server'

import bcrypt from 'bcrypt'

import fetchUserByEmail from './getUserByEmail'
import { sendVerificationToken } from '../mail/sendVerificationToken'
import { createUser } from 'database'
import { Pool } from 'pg'
import { RegisterSchema, registerSchema } from '@schema/register'

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
export const register = async ({
  values,
  callbackUrl,
}: {
  values: registerSchema
  callbackUrl?: string
}) => {
  const validatedFields = RegisterSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  const { email, password, name } = validatedFields.data
  const hashedPassword = await bcrypt.hash(password, 10)

  const existingUser = await fetchUserByEmail({
    email,
  })

  if (existingUser) {
    return { error: 'Email already in use!' }
  }
  const client = await pool.connect()

  await createUser(client, {
    name,
    email,
    password: hashedPassword,
    role: 'user',
    emailverified: null,
    istwofactorenabled: null,
    twofactorconfirmation: null,
  })
  // eslint-disable-next-line no-console
  console.log('the email', email)

  const sentEmail = await sendVerificationToken({
    identifier: email,
    url: callbackUrl || 'http://localhost:3000',
  })
  // eslint-disable-next-line no-console
  console.log('sentEmail', sentEmail)

  return { success: 'Confirmation email sent!' }
}
