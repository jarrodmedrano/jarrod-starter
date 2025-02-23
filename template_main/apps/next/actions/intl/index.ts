'use server'
import { cookies } from 'next/headers'

const COOKIE_NAME = 'NEXT_LOCALE'

export const getLocale = async () => {
  return (await cookies()).get(COOKIE_NAME)?.value
}

export const setLocale = async (lang: string) => {
  ;(await cookies()).set(COOKIE_NAME, lang)
}
