import { NewVerificationForm } from '@ui/components/tailwind/verification'
import { newVerification } from '../../../actions/user/verifyUser'

const VerifyTokenPage = () => {
  return <NewVerificationForm newVerification={newVerification} />
}

export default VerifyTokenPage
