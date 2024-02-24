import { Header as HeaderNav } from '@ui/components/tailwind/header'
import { Logo } from '@ui/components/icons/logo'
import { navigation } from '../utils/constants'

export const Header = () => {
  return (
    <HeaderNav
      navigation={navigation}
      companyName="Story Bible"
      companyLogo={<Logo className="h-8 w-auto" />}
      companyLink={'/'}
    />
  )
}
