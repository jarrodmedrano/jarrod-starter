import { v4 as uuidv4 } from 'uuid'
import fetchVerificationToken from './getVerificationToken'
import { createVerificationToken, deleteVerificationToken } from 'database'
import pool from '../../app/utils/open-pool'

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
