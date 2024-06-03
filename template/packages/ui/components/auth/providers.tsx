'use client'
import { Button } from '../ui/button'
import { ProviderIcons } from '../tailwind/providerIcons'
import { signIn as nextSignIn } from 'next-auth/react'

const handleProviderSignIn = async (provider: string, { ...args }) => {
  let response = {}

  await nextSignIn(provider?.toLowerCase(), {
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

export const ProviderSignin = ({
  providers,
  callbackUrl,
}: {
  providers: any
  callbackUrl?: string | null
}) => {
  {
    return Object.values(providers).map((provider: any) => {
      return provider.name !== 'Email' && provider.name !== 'Credentials' ? (
        <div key={provider.name}>
          <Button
            variant="icon"
            className="flex w-full"
            onClick={() =>
              handleProviderSignIn(provider.name, {
                callbackUrl,
              })
            }
          >
            <ProviderIcons providerName={provider.name} />
            Login with {provider.name}
          </Button>
        </div>
      ) : null
    })
  }
}
