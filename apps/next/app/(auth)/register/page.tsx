import { RegisterFormCard } from '@ui/components/tailwind/register'
import { authConfig, signIn, signOut } from '../../../auth'
import { register } from '../../../actions/user/registerUser'

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

const RegisterPage = () => {
  const providers = getProviders()

  const handleCredentialRegister = async ({ ...args }) => {
    'use server'

    let response = {}

    const registerResult = await register({
      values: {
        email: args.email,
        password: args.password,
        name: args.name,
      },
      callbackUrl: args.callbackUrl || 'http://localhost:3000',
    })
    if (registerResult.error) {
      response = {
        error: registerResult.error,
      }
    } else {
      response = {
        headline: 'Check your email',
        success: 'A sign in link has been sent to your email address.',
      }
    }

    // eslint-disable-next-line no-console
    console.log('registerResult', registerResult)

    // eslint-disable-next-line no-console
    console.log('args', args)

    return response
  }

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
    <RegisterFormCard
      emailSignin={handleEmailSignIn}
      providerSignin={handleProviderSignIn}
      signOut={handleSignOut}
      credentialsRegister={handleCredentialRegister}
      providers={providers}
      credentials
    />
  )
}

export default RegisterPage
