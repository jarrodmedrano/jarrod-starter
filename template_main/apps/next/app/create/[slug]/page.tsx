import withAuth from '../../utils/withAuth'
import CreateScreen from '@app/features/create/screen'
import listEntitiesForUser from '../../../actions/entities/listEntitiesforUser'

const CreatePage = (props: any) => {
  return <CreateScreen {...props} listEntitiesForUser={listEntitiesForUser} />
}

export default withAuth(CreatePage)
