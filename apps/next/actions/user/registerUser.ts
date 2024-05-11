'use server'

import bcrypt from 'bcryptjs'

import fetchUserByEmail from './getUserByEmail'
import { sendVerificationToken } from '../mail/sendVerificationToken'
import { createUser } from 'database'
import { RegisterSchema, registerSchema } from '@schema/register'
import pool from '../../app/utils/open-pool'

export const registerUser = async ({
  values,
  callbackUrl,
}: {
  values: registerSchema
  callbackUrl?: string | null
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

  await sendVerificationToken({
    identifier: email,
    url: callbackUrl || 'http://localhost:3000',
  })

  return { success: 'Confirmation email sent!' }
}
