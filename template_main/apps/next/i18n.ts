import { getRequestConfig } from 'next-intl/server'
import { getLocale } from './actions/intl'

export type Locale = (typeof locales)[number]

export const locales = ['en', 'de'] as const
export const defaultLocale: Locale = 'en'

export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  const locale = (await getLocale()) || defaultLocale

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  }
})
