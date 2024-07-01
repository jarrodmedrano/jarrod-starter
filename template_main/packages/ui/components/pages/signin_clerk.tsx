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
  headerLabel,
  backButtonLabel,
  backButtonHref,
  children,
}: {
  headerLabel: string
  backButtonLabel: string
  backButtonHref: string
  children: React.ReactNode
}) => {
  return (
    <CardWrapper
      headerLabel={headerLabel}
      backButtonLabel={backButtonLabel}
      backButtonHref={backButtonHref}
      slim
    >
      {children}
    </CardWrapper>
  )
}
