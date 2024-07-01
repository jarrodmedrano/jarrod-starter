import { SignUp } from '@clerk/nextjs'
import { SigninFormClerk } from '@ui/components/pages/signin_clerk'

export default function Page() {
  return <SigninFormClerk children={<SignUp path="/register" />} />
}
