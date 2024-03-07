import { SigninFormCard } from '@ui/components/tailwind/signin'
import { authConfig, signIn, signOut } from '../../../auth'

export type Provider = {
  id: string
  name: string
  type: string
  style: {
    logo: string
    bg: string
    text: string
  }
}

function getKeyValuesFromObject<T>(obj: any, keys: (keyof T)[]): T {
  return keys.reduce((acc, key) => {
    if (obj[key]) {
      acc[key] = obj[key]
    }
    return acc
  }, {} as T)
}

function getProviders(): Provider[] {
  const providerKeys: (keyof Provider)[] = ['id', 'name', 'type', 'style']
  return authConfig.providers.map((provider) =>
    getKeyValuesFromObject<Provider>(provider, providerKeys),
  )
}

const SigninPage = () => {
  const providers = getProviders()

  const handleEmailSignIn = async (signinType: string, { ...args }) => {
    'use server'
    let success = false

    try {
      await signIn(signinType, {
        ...args,
      })
      success = true
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
      return {
        error: 'Something went wrong',
      }
    } finally {
      //Clear resources
      if (success) {
        return {
          success: 'Successfully signed in',
        }
      }
    }
  }

  const handleProviderSignIn = async (provider: string, { ...args }) => {
    'use server'
    let success = false

    try {
      await signIn(provider, { ...args })
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)

      return {
        error: 'Something went wrong',
      }
    } finally {
      //Clear resources
      if (success) {
        return {
          success: 'Successfully signed in',
        }
      }
    }
  }

  const handleSignOut = async () => {
    'use server'
    await signOut()
  }

  return (
    <SigninFormCard
      emailSignin={handleEmailSignIn}
      providerSignin={handleProviderSignIn}
      signOut={handleSignOut}
      providers={providers}
    />
  )
}

export default SigninPage
