import { UserButton } from './userbutton'

export const LoginButton = (props: {
  companyLink: string
  companyName: string
  navigation: { name: string; href: string }[]
  companyLogo: React.ReactElement
}) => {
  return <UserButton {...props} />
}
