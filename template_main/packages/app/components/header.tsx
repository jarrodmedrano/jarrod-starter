import { Header as HeaderNav } from '@ui/components/header/header'
import { Logo } from '@ui/components/icons/logo'
import React, { useEffect } from 'react'
import { createKeyIndex } from '../../ui/components/dashboard/utils/build-nav'
import sitemap from '../../sitemap/sitemap.json'

export const Header = () => {
  const [mainNav, setMainNav] = React.useState<
    {
      name: string
      href: string
    }[]
  >([])

  useEffect(() => {
    const keyIndex = createKeyIndex(sitemap)
    const pages = keyIndex.pages
    pages.shift()
    const navs: {
      name: string
      href: string
    }[] = pages.reduce((prev: any, curr: any) => {
      return curr.name !== 'about'
        ? [
            ...prev,
            {
              name: curr.name,
              href: curr.loc,
            },
          ]
        : [
            ...prev,
            ...curr.children.map((child: any) => {
              return {
                name: child.page.name,
                href: child.page.loc,
              }
            }),
          ]
    }, [])
    navs.pop()
    navs.pop()
    setMainNav(navs)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <HeaderNav
      navigation={mainNav}
      companyName={'Company Name'}
      companyLogo={<Logo className="h-8 w-auto" />}
      companyLink={'/'}
    />
  )
}
