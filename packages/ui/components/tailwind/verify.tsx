'use client'
import { Logo } from '../icons/logo'

export const VerifyCard = () => {
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Logo className="mx-auto h-10 w-auto" />
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-white dark:text-gray-200">
            Verify your email
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="flex flex-col bg-white px-6 py-12 shadow dark:bg-gray-800 sm:rounded-lg sm:px-12">
            <div className="w-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="mx-auto h-10 w-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                />
              </svg>
            </div>

            <p className="mt-5 text-center text-sm text-gray-500 dark:text-gray-400">
              We have sent an email to your email address. Please click on the
              link in the email to verify your email address.
            </p>
          </div>

          <p className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
            <a href="/" className="font-semibold leading-6">
              Go back
            </a>
          </p>
        </div>
      </div>
    </>
  )
}
