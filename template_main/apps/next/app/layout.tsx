// import '../src/styles/global.css'
import { PublicEnvProvider } from 'next-runtime-env'
import { Provider } from '@app/provider'
import '@ui/styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import { Metadata } from 'next'
import GoogleAnalytics from './GoogleAnalytics'
import { auth } from '../auth'
import { ClerkProvider } from '@clerk/nextjs'

export const metadata: Metadata = {
  title: 'Starter App',
  description: 'Just a regular old starter app',
}

export default async function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  return (
    <SessionProvider session={session}>
      <ClerkProvider>
        <html lang="en">
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />
          <body>
            <GoogleAnalytics />
            <PublicEnvProvider>
              <Provider>{children}</Provider>
            </PublicEnvProvider>
          </body>
        </html>
      </ClerkProvider>
    </SessionProvider>
  )
}
