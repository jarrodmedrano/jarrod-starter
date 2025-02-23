import { SignIn } from '@clerk/nextjs'
import { SigninFormClerk } from '@repo/ui/components/pages/signin_clerk'

export default function Page() {
  return (
    <SigninFormClerk
      headerLabel="Sign In"
      backButtonLabel="Don't have an account?"
      backButtonHref="/register"
    >
      <SignIn path="/signin" />
    </SigninFormClerk>
  )
}
