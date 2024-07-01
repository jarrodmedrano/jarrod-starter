'use client'
import { CardWrapper } from '../card/card-wrapper'

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
export const SigninFormClerk = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <CardWrapper
      headerLabel="Sign In"
      backButtonLabel="Don't have an account?"
      backButtonHref="/register"
    >
      {children}
    </CardWrapper>
  )
}
