import { SigninFormCard } from '@ui/components/tailwind/signin'
import { authConfig } from '../../../auth'
import { signIn, signOut } from 'next-auth/react'

type Provider = {
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

  return (
    <SigninFormCard signIn={signIn} signOut={signOut} providers={providers} />
  )
}

export default SigninPage
