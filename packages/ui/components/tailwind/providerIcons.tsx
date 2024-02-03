import { AppleIcon } from '../icons/apple'
import { FacebookIcon } from '../icons/facebook'
import { GithubIcon } from '../icons/github'
import { GoogleIcon } from '../icons/google'

export const ProviderIcons = ({ providerName }: { providerName: string }) => {
  const provider = providerName.toLowerCase()
  switch (provider) {
    case 'github':
      return <GithubIcon />
    case 'google':
      return <GoogleIcon />
    case 'facebook':
      return <FacebookIcon />
    case 'apple':
      return <AppleIcon />
    default:
      return null
  }
}
