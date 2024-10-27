'use client'

import * as React from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@ui/components/ui/ui/dropdown-menu'
import { Button } from '@ui/components/ui/ui/button'
import { LanguageIcon } from '@heroicons/react/20/solid'
import { locales } from '../../../../app/lang'
import { useCookies } from 'next-client-cookies'

export function LangButton() {
  const cookies = useCookies()
  const handleLocaleChange = (locale: string) => {
    cookies.set('NEXT_LOCALE', locale)
    window.location.reload()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-9 px-0">
          <LanguageIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {locales.map((locale) => (
          <DropdownMenuItem
            key={locale}
            onClick={() => handleLocaleChange(locale)}
          >
            {locale}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
