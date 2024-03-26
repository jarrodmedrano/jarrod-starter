'use client'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { FormEvent, useState, useTransition } from 'react'
import { useSearchParams } from 'next/navigation'
import { Checkbox } from '../ui/checkbox'
import { A } from '../generic/link'
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
export const SigninFormCard = ({
  providers,
  credentials = false,
  credentialsSignin,
}: {
  providers: Provider[]
  credentialsSignin: ({
    ..._args
  }: {
    signInType: string
    values: { code?: string | undefined; email: string; password: string }
    callbackUrl?: string | undefined
  }) => Promise<
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

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    setErrorOrSuccess({
      error: '',
      success: '',
      headline: '',
    })

    startTransition(async () => {
      try {
        const result = await credentialsSignin({
          signInType: 'credentials',
          values: {
            email,
            password,
          },
          callbackUrl,
        })

        if (result?.success) {
          setErrorOrSuccess({
            error: '',
            success: `Success`,
            headline: result?.headline,
          })
        } else if (result?.error) {
          setErrorOrSuccess({
            error: result?.error,
            success: undefined,
            headline: 'Error',
          })
        }
      } catch (error) {
        setErrorOrSuccess({
          headline: 'Error',
          error: `${error}`,
          success: undefined,
        })
      }
    })
  }

  return (
    <CardWrapper
      headerLabel="Sign In"
      backButtonLabel="Don't have an account?"
      backButtonHref="/register"
    >
      {errorOrSuccess?.error && (
        <p className="text-center text-sm text-red-500 dark:text-red-400">
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
                Email
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
                      placeholder="your email address"
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

                  <div className="text-sm leading-6">
                    <Button variant="link">
                      <a href="/reset">Forgot password?</a>
                    </Button>
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
              {' '}
              <ProviderSignin providers={providers} callbackUrl={callbackUrl} />
            </div>
          </div>
        </>
      ) : (
        <p className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
          <A href={callbackUrl || '/'}>Click Here</A> if you are not redirected
        </p>
      )}
    </CardWrapper>
  )
}
