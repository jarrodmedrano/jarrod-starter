import { SigninFormCard } from '@ui/components/pages/signin'
import { authConfig, signOut } from '../../../../auth'
import { signInUser } from '../../../../actions/user/signinUser'

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

  const handleSignOut = async () => {
    'use server'
    await signOut()
  }

  return (
    <SigninFormCard
      signOut={handleSignOut}
      credentialsSignin={signInUser}
      providers={providers}
      credentials
    />
  )
}

export default SigninPage
