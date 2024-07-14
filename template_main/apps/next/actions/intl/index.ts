'use server'
import { cookies } from 'next/headers'

const COOKIE_NAME = 'NEXT_LOCALE'

export const getLocale = () => {
  return cookies().get(COOKIE_NAME)?.value
}

export const setLocale = async (lang: string) => {
  cookies().set(COOKIE_NAME, lang)
}
