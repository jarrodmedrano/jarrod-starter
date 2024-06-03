import withAuth from '../../utils/withAuth'
import CreateScreen from '@app/features/create/screen'
const CreatePage = (props: any) => {
  return <CreateScreen {...props} />
}

export default withAuth(CreatePage)
