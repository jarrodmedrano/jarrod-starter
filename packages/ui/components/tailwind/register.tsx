'use client'
import { Button } from '../ui/button'
import { ProviderIcons } from './providerIcons'
import { Input } from '../ui/input'
import { FormEvent, useState, useTransition } from 'react'
import { useSearchParams } from 'next/navigation'
import { Logo } from '../icons/logo'
import { Checkbox } from '../ui/checkbox'
import { A } from '../generic/link'

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
  providerSignin,
  credentials = false,
  credentialsRegister,
}: {
  providers: Provider[]
  credentialsRegister: ({ ..._args }: { [x: string]: any }) => Promise<
    | {
        error?: string
        success?: string
        headline?: string
      }
    | undefined
  >
  emailSignin?: (
    _provider: string,
    { ..._args }: { [x: string]: any },
  ) => Promise<
    | {
        error?: string
        success?: string
        headline?: string
      }
    | undefined
  >
  providerSignin: (
    _provider: string,
    { ..._args }: { [x: string]: any },
  ) => Promise<
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
    const email = formData.get('email')
    const password = formData.get('password')
    const username = formData.get('name')

    setErrorOrSuccess({
      error: '',
      success: '',
      headline: '',
    })

    startTransition(() => {
      credentialsRegister({
        email,
        password,
        name: username,
        callbackUrl,
        redirectTo: callbackUrl || '/create',
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
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Logo className="mx-auto h-10 w-auto" />
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-white dark:text-gray-200">
            Register New Account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow dark:bg-gray-800 sm:rounded-lg sm:px-12">
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              Already have an account? <A href="/signin">Sign In</A>
            </p>
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
                    {providers != null &&
                      Object.values(providers).map((provider: any) => {
                        return provider.name !== 'Email' &&
                          provider.name !== 'Credentials' ? (
                          <div key={provider.name}>
                            <Button
                              variant="icon"
                              className="flex w-full"
                              onClick={() =>
                                providerSignin(provider.name, {
                                  callbackUrl,
                                })
                              }
                            >
                              <ProviderIcons providerName={provider.name} />
                              Register with {provider.name}
                            </Button>
                          </div>
                        ) : null
                      })}
                  </div>
                </div>
              </>
            ) : (
              <p className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
                {errorOrSuccess?.success}
              </p>
            )}
          </div>

          <p className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
            <a href="/" className="font-semibold leading-6">
              Cancel and go back
            </a>
          </p>
        </div>
      </div>
    </>
  )
}
