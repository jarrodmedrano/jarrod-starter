import { Inbox } from 'lucide-react'

export interface KeyIndex {
  collections: []
  pages: []
}

export const createKeyIndex = (sitemap: any): KeyIndex => {
  const keys = Object.keys(sitemap)
  const collections: any = []
  const pages: any = []
  keys?.reduce((acc: any, curr: any) => {
    sitemap[curr]?.collection
      ? collections.push(sitemap[curr].collection)
      : pages.push(sitemap[curr].page)
    return acc
  }, [])

  return {
    collections,
    pages,
  }
}

export const createSubNav = (keyIndex: any) => {
  return keyIndex?.pages?.reduce((acc: any, curr: any) => {
    if (curr && curr?.children) {
      // eslint-disable-next-line no-console
      console.log('curr', curr)
      return [
        ...acc,
        {
          title: curr.name || curr.loc,
          label: curr.label || curr.loc,
          href: curr.loc,
          icon: Inbox,
          variant: 'ghost',
          children: curr.children.map((child: any) => {
            // eslint-disable-next-line no-console
            console.log('curr', curr)
            return {
              title: child.page.name || child.page.loc,
              label: child.page.label || child.page.loc,
              icon: Inbox,
              variant: 'ghost',
              href: child.page.loc,
            }
          }),
        },
      ]
    }
    return [
      ...acc,
      {
        title: curr.name,
        label: curr.label,
        icon: Inbox,
        variant: 'ghost',
        href: curr.loc,
      },
    ]
  }, [])
}
