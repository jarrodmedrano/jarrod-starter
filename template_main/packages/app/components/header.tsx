import { Header as HeaderNav } from '@ui/components/header/header'
import { Logo } from '@ui/components/icons/logo'
import { navigation } from '../utils/constants'

export const Header = () => {
  return (
    <HeaderNav
      navigation={navigation}
      companyName={process.env.COMPANY_NAME || 'Company Name'}
      companyLogo={<Logo className="h-8 w-auto" />}
      companyLink={'/'}
    />
  )
}
