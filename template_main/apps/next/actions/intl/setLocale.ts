'use server'
import { cookies } from 'next/headers'

export const setLocale = async (lang: string) => {
  cookies().set('locale', lang)
}
