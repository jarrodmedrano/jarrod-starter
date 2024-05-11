import listEntitiesForUser from '../../actions/entities/listEntitiesforUser'
import withAuth from '../utils/withAuth'
import CreateScreen from '@app/features/create/screen'

const CreatePage = async (props: any) => {
  const { session } = props

  // if (!session) {
  //   return null
  // }

  const data = await listEntitiesForUser({
    userid: session?.user.id,
    limit: '10',
    offset: '0',
  })

  return <CreateScreen {...props} data={data} />
}

export default withAuth(CreatePage)
