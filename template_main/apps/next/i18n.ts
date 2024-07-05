import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
 
// Can be imported from a shared config
export const locales = ['en', 'de'];

export const intlConfig = {
  locales,
  defaultLocale: 'en',
}

export const pipedString = locales.join('|');
 
export default getRequestConfig(async ({locale}: {
    locale: string
}) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as string)) notFound();
 
  return {
    messages: (await import(`../messages/${locale}.json`)).default
  };
});