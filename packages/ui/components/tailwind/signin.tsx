'use client'
import { Button } from '../ui/button'
import { ProviderIcons } from './providerIcons'
import { Input } from '../ui/input'
import { FormEvent, useState, useTransition } from 'react'
import { useSearchParams } from 'next/navigation'
import { Logo } from '../icons/logo'

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
export const SigninFormCard = ({
  providers,
  emailSignin,
  providerSignin,
  credentials = false,
}: {
  providers: Provider[]
  emailSignin: (
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
  const callbackUrl = searchParams.get('callbackUrl') || '/'

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

  const handleEmailSignin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email')

    setErrorOrSuccess({
      error: '',
      success: '',
      headline: '',
    })

    startTransition(() => {
      emailSignin('email', {
        email,
        callbackUrl,
        redirectTo: callbackUrl || '/create',
      })
        .then((data) => {
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
        .catch(() =>
          setErrorOrSuccess({
            headline: 'Error',
            error: 'Something went wrong',
          }),
        )
    })
  }
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Logo className="mx-auto h-10 w-auto" />
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-white dark:text-gray-200">
            Sign in
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow dark:bg-gray-800 sm:rounded-lg sm:px-12">
            {!errorOrSuccess?.success ? (
              <>
                <form
                  className="space-y-6"
                  action="#"
                  onSubmit={handleEmailSignin}
                  method="POST"
                >
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
                        required
                      />
                    </div>
                  </div>
                  {credentials && (
                    <>
                      <div>
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Password
                        </label>
                        <div className="mt-2">
                          <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <input
                            id="remember-me"
                            name="remember-me"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <label
                            htmlFor="remember-me"
                            className="ml-3 block text-sm leading-6 text-gray-900"
                          >
                            Remember me
                          </label>
                        </div>

                        <div className="text-sm leading-6">
                          <a
                            href="#"
                            className="font-semibold text-indigo-600 hover:text-indigo-500"
                          >
                            Forgot password?
                          </a>
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
                      Sign in
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
                        return provider.name !== 'Email' ? (
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
                              Login with {provider.name}
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
