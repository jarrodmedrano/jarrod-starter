import { A } from '../generic/link'
import { Logo } from '../icons/logo'

interface HeaderProps {
  label: string
  backButtonHref: string
  backButtonLabel: string
}

export const Header = ({
  label,
  backButtonLabel,
  backButtonHref,
}: HeaderProps) => {
  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <A href="/">
        <Logo className="mx-auto h-10 w-auto" />
      </A>
      <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-white dark:text-gray-200">
        {label}
      </h2>

      {backButtonLabel ? (
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          <A href={backButtonHref}>{backButtonLabel}</A>
        </p>
      ) : null}
    </div>
  )
}
