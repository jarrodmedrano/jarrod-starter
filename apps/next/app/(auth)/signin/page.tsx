import { SigninFormCard } from '@ui/components/pages/signin'
import { authConfig, signIn, signOut } from '../../../auth'
import { signInUser } from '../../../actions/user/signinUser'

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
      providerSignin={handleProviderSignIn}
      signOut={handleSignOut}
      credentialsSignin={signInUser}
      providers={providers}
      credentials
    />
  )
}

export default SigninPage
