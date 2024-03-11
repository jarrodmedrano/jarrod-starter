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
    let response = {}

    await signIn(signinType, {
      ...args,
    })
    response = {
      headline: 'Check your email',
      success: 'A sign in link has been sent to your email address.',
    }

    // eslint-disable-next-line no-console
    console.log('args', args)

    return response
  }

  const handleProviderSignIn = async (provider: string, { ...args }) => {
    'use server'

    let response = {}

    signIn(provider, {
      ...args,
    })
      .then(() => {
        response = {
          headline: 'Check your email',
          success: 'A sign in link has been sent to your email address.',
        }
      })
      .catch(() => {
        response = {
          headline: 'Sign in error',
          error: 'Something went wrong',
        }
      })

    return response
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
