import withAuth from '../utils/withAuth'

const CreatePage = (props: any) => {
  return (
    <>
      <h2 className="mt-4 font-medium">You are logged in as:</h2>
      <p className="mt-4">{props?.session?.user?.name}</p>
    </>
  )
}

export default withAuth(CreatePage)
