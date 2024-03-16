'use server'

import fetchUserByEmail from './getUserByEmail'
import updateUser from './updateUser'
import fetchVerificationToken from './getVerificationToken'
import deleteToken from './deleteVerificationToken'

export const newVerification = async (token: string) => {
  const existingToken = await fetchVerificationToken({
    token,
  })

  if (!existingToken) {
    return { error: 'Token does not exist!' }
  }

  const hasExpired = new Date(existingToken.expires) < new Date()

  if (hasExpired) {
    return { error: 'Token has expired!' }
  }

  const existingUser = await fetchUserByEmail({
    email: existingToken.identifier,
  })

  if (!existingUser) {
    return { error: 'Email does not exist!' }
  }

  await updateUser({
    emailverified: new Date(),
    email: null,
    id: existingUser.id,
    name: null,
    image: null,
    password: null,
    role: null,
    istwofactorenabled: null,
    twofactorconfirmation: null,
  })

  await deleteToken({
    identifier: existingToken.identifier,
  })

  return { success: 'Email verified!' }
}
