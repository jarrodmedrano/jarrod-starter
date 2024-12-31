import { getRequestConfig } from 'next-intl/server'
import { getLocale } from './actions/intl'

export type Locale = (typeof locales)[number]

export const locales = ['en', 'de'] as const
export const defaultLocale: Locale = 'en'

interface RequestConfig {
  locale: string
  messages: Record<string, string>
}

const getRequestsConfig = getRequestConfig(async (): Promise<RequestConfig> => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  const locale = (await getLocale()) || defaultLocale

  const messages: Record<string, string> = (
    await import(`./messages/${locale}.json`)
  ).default

  return {
    locale,
    messages,
  }
})

export default getRequestsConfig as () => Promise<RequestConfig>
