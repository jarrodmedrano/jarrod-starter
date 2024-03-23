'use client'
import { CardWrapper } from '../card/card-wrapper'

export const VerifyCard = () => {
  return (
    <CardWrapper
      headerLabel="Check your email"
      backButtonLabel="Sign in again?"
      backButtonHref="/signin"
    >
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
        We have sent an email to your email address. Please click on the link in
        the email to verify your email address.
      </p>

      <p className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
        <a href="/" className="font-semibold leading-6">
          Go back
        </a>
      </p>
    </CardWrapper>
  )
}
