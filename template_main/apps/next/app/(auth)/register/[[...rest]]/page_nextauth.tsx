import { RegisterFormCard } from '@ui/components/pages/register'
import { authConfig, signOut } from '../../../../auth'
import { registerUser } from '../../../../actions/user/registerUser'

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

  const handleSignOut = async () => {
    'use server'
    await signOut()
  }

  return (
    <RegisterFormCard
      signOut={handleSignOut}
      credentialsRegister={registerUser}
      providers={providers}
      credentials
    />
  )
}

export default RegisterPage
