'use client'
import { createGlobalStyle } from 'styled-components'

import { ThemeProvider } from 'next-themes'

// TODO: GlobalStyle doesn't work in mobile so you have to remove it
const GlobalStyle = createGlobalStyle`
  :root {
    --fg: #000;
    --bg: #fff;
  }

  [data-theme="dark"] {
    --fg: #fff;
    --bg: #000;
  }
`

export const Providers = ({
  children: children,
}: {
  children: React.ReactNode
}) => {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider>{children}</ThemeProvider>
    </>
  )
}
