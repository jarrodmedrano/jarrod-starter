'use client'

import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { CardWrapper } from '../card/card-wrapper'
import { A } from '../generic/link'

export const NewVerificationForm = ({
  newVerification,
}: {
  newVerification: (_token: string) => Promise<{
    error?: string
    success?: string
    headline?: string
  }>
}) => {
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()

  const searchParams = useSearchParams()

  const token = searchParams.get('token')

  const onSubmit = useCallback(() => {
    if (success || error) return

    if (!token) {
      setError('Missing token!')
      return
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data.success)
        setError(data.error)
      })
      .catch(() => {
        setError('Something went wrong!')
      })
  }, [token, success, error])

  useEffect(() => {
    onSubmit()
  }, [onSubmit])

  return (
    <CardWrapper
      headerLabel="Verify Token"
      backButtonLabel="Don't have an account?"
      backButtonHref="/register"
    >
      <p className="mt-5 text-center text-sm text-gray-500 dark:text-gray-400">
        {success}
        {error} <A href="/signin">Sign in again</A>
      </p>
    </CardWrapper>
  )
}
