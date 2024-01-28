import { GithubIcon } from '../icons/github'
import { GoogleIcon } from '../icons/google'

export const ProviderIcons = ({ providerName }: { providerName: string }) => {
  const provider = providerName.toLowerCase()
  switch (provider) {
    case 'github':
      return <GithubIcon />
    case 'google':
      return <GoogleIcon />
    default:
      return null
  }
}
