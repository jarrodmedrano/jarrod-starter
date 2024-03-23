'use server'

import fetchUserByEmail from './getUserByEmail'
import { sendVerificationToken } from '../mail/sendVerificationToken'
import { LoginSchema, loginSchema } from '@schema/login'
import { generateVerificationToken } from './generateVerificationToken'
import { signIn } from '../../auth'
// import { AuthError } from 'next-auth'
import { DEFAULT_LOGIN_REDIRECT } from '../../routes'

export const signInUser = async ({
  signInType,
  values,
  callbackUrl,
}: {
  signInType: string
  values: loginSchema
  callbackUrl?: string
}) => {
  const validatedFields = LoginSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  const { email, password } = validatedFields.data

  const existingUser = await fetchUserByEmail({
    email,
  })

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: 'User does not exist!' }
  }

  if (!existingUser.emailverified) {
    await generateVerificationToken(existingUser.email)

    await sendVerificationToken({
      identifier: email,
      url: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    })

    return {
      headline: 'Check your email',
      success:
        'Your email is not yet verified. Check your email and click on the link to get verified!',
    }
  }

  await signIn(signInType, {
    email,
    password,
    redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    redirect: true,
  })
  // } catch (error) {
  // eslint-disable-next-line no-console
  // console.log('the error', error)
  // if (error instanceof AuthError) {
  //   switch (error.type) {
  //     case 'CredentialsSignin':
  //       return { error: 'Invalid credentials!' }
  //     default:
  //       return { error: 'Something went wrong!' }
  //   }
  // }

  // throw error
  // }
}
