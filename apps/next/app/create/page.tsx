import { CreateScreen } from '@app/features/create/screen'
import { auth } from '../../auth'

const CreatePage = async () => {
  const session = await auth()
  // console.log('me')
  // console.log('the session', session)
  if (!session) {
    return (
      <>
        <h1>Protected Page</h1>
        <p>You cant view this page because you arent signed in.</p>
      </>
    )
  } else {
    return (
      <>
        <h2 className="mt-4 font-medium">You are logged in as:</h2>
        <p className="mt-4">{session?.user?.name}</p>
        <CreateScreen />
      </>
    )
  }
}

export default CreatePage
