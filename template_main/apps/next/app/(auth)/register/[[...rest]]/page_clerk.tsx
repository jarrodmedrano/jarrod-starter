import { SignUp } from '@clerk/nextjs'
import { SigninFormClerk } from '@ui/components/pages/signin_clerk'

export default function Page() {
  return (
    <SigninFormClerk
      headerLabel="Register"
      backButtonLabel="Already have an account?"
      backButtonHref="/signin"
    >
      <SignUp path="/register" />
    </SigninFormClerk>
  )
}
