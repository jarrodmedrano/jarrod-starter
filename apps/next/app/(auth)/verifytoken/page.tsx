import { NewVerificationForm } from '@ui/components/pages/verify-token'
import { newVerification } from '../../../actions/user/verifyUser'

const VerifyTokenPage = () => {
  return <NewVerificationForm newVerification={newVerification} />
}

export default VerifyTokenPage
