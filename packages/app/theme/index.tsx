'use client'
import { createGlobalStyle } from 'styled-components'

import { ThemeProvider } from 'next-themes'

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
