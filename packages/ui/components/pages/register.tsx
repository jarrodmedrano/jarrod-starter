'use client'
import { Button } from '../ui/button'
// import { ProviderIcons } from './providerIcons'
import { Input } from '../ui/input'
import { FormEvent, useState, useTransition } from 'react'
import { useSearchParams } from 'next/navigation'
import { Checkbox } from '../ui/checkbox'
import { CardWrapper } from '../card/card-wrapper'
import { ProviderSignin } from '../auth/providers'

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
export const RegisterFormCard = ({
  providers,
  credentials = false,
  credentialsRegister,
}: {
  providers: Provider[]
  credentialsRegister: ({
    ..._args
  }: {
    signInType: string
    values: {
      name: string
      code?: string | undefined
      email: string
      password: string
    }
    callbackUrl?: string | null
  }) => Promise<
    | {
        error?: string
        success?: string
        headline?: string
      }
    | undefined
  >

  signOut: () => Promise<void>
  credentials?: boolean
}) => {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl')

  const [, startTransition] = useTransition()

  const [errorOrSuccess, setErrorOrSuccess] = useState<
    | {
        error?: string
        success?: string
        headline?: string
      }
    | undefined
  >({
    error: '',
    success: '',
    headline: '',
  })

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const username = formData.get('name') as string

    setErrorOrSuccess({
      error: '',
      success: '',
      headline: '',
    })

    startTransition(() => {
      credentialsRegister({
        signInType: 'credentials',
        values: {
          email,
          password,
          name: username,
        },
        callbackUrl,
      }).then((data) => {
        if (data?.success) {
          setErrorOrSuccess({
            error: '',
            success: data?.success,
            headline: data?.headline,
          })
        }
        if (data?.error) {
          setErrorOrSuccess({
            error: data?.error,
            headline: data?.headline,
          })
        }
      })
    })
  }

  return (
    <>
      <CardWrapper
        headerLabel="Register"
        backButtonLabel="Already have an account?"
        backButtonHref="/signin"
        showSocial
      >
        {errorOrSuccess?.error && (
          <p className="mt-2 text-center text-sm text-red-600">
            {errorOrSuccess?.error}
          </p>
        )}
        {!errorOrSuccess?.success ? (
          <>
            <form
              className="space-y-6"
              action="#"
              onSubmit={onSubmit}
              method="POST"
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200"
                >
                  Name
                </label>
                <div className="mt-2">
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="choose a unique username"
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="your email address"
                    required
                    className="... invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
                  />
                </div>
              </div>
              {credentials && (
                <>
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200"
                    >
                      Password
                    </label>
                    <div className="mt-2">
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between  align-middle">
                    <div className="flex items-center">
                      <Checkbox id="remember-me" name="remember-me" />
                      <label
                        htmlFor="remember-me"
                        className="ml-3 block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                </>
              )}
              <div>
                <Button
                  variant="default"
                  type="submit"
                  className="rounded-mdpx-3 flex w-full justify-center py-1.5 text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  Register
                </Button>
              </div>
            </form>
            <div>
              <div className="relative mt-10">
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm font-medium leading-6">
                  <span className="bg-white px-6 text-gray-900 dark:bg-gray-800 dark:text-gray-200 ">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1  gap-4">
                <ProviderSignin
                  providers={providers}
                  callbackUrl={callbackUrl}
                />
              </div>
            </div>
          </>
        ) : (
          <p className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
            {errorOrSuccess?.success}
          </p>
        )}
      </CardWrapper>
    </>
  )
}
