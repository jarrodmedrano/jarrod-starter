'use client'
import { Button } from '../ui/button'
import { ProviderIcons } from './providerIcons'
import { Input } from '../ui/input'
import { FormEvent } from 'react'

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
  ) => Promise<void>
  providerSignin: (_x: string) => Promise<void>
  signOut: () => Promise<void>
  credentials?: boolean
}) => {
  const handleEmailSignin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email')
    try {
      const result = await emailSignin('email', {
        email,
      })

      return result
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
    }
  }
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-200">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12 dark:bg-gray-800">
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
                          onClick={() => providerSignin(provider.name)}
                        >
                          <ProviderIcons providerName={provider.name} />
                          Login with {provider.name}
                        </Button>
                      </div>
                    ) : null
                  })}
              </div>
            </div>
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
