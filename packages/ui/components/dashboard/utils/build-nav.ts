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

export const createPagesSubNav = (
  keyIndex: any,
  type: 'pages' | 'collections',
  data: any,
) => {
  return keyIndex?.[type]?.reduce((acc: any, curr: any) => {
    if (curr && curr?.name && data?.[curr.name]) {
      return [
        ...acc,
        {
          title: curr.name || curr.loc,
          label: curr.label || curr.loc,
          href: curr.loc,
          icon: Inbox,
          variant: 'ghost',
          children: data?.[curr?.name]?.map((child: any) => {
            return {
              title: child.title,
              label: child.title,
              icon: Inbox,
              variant: 'ghost',
              href: child?.slug || curr?.loc,
            }
          }),
        },
      ]
    }
    if (curr && curr?.children) {
      return [
        ...acc,
        {
          title: curr.name || curr.loc,
          label: curr.label || curr.loc,
          href: curr.loc,
          icon: Inbox,
          variant: 'ghost',
          children: curr.children.map((child: any) => {
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
