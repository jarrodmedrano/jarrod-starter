import CookieWrapper from '../../CookieWrapper'
import withAuth from '../../utils/withAuth'
import CreateScreen from '@app/features/create/screen'
const CreatePage = (props: any) => {
  return (
    <CookieWrapper>
      <CreateScreen {...props} />
    </CookieWrapper>
  )
}

export default withAuth(CreatePage)
