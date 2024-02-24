import { User as DefaultUser } from '@auth/core/types'
import { AdapterUser as DefaultAdapterUser } from '@auth/core/adapters'
import Google from 'next-auth/providers/google'
import Facebook from 'next-auth/providers/facebook'
import Apple from 'next-auth/providers/apple'
import EmailProvider, { EmailConfig } from 'next-auth/providers/email'
import NextAuth from 'next-auth'
import type { NextAuthConfig } from 'next-auth'
// import GitHub from 'next-auth/providers/github'
import { sendVerificationRequest } from './utils/sendVerificationRequest'
import PostgresAdapter from '@auth/pg-adapter'
import { Pool } from 'pg'

const pool = new Pool({
  host: process.env.DATABASE_HOST || 'localhost',
  user: process.env.DATABASE_USER || 'root',
  port: 5499,
  password: process.env.DATABASE_SECRET || 'secret',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  database: process.env.DATABASE_NAME || 'starter-app',
})

declare module 'next-auth' {
  export interface User extends DefaultUser {
    id: string
    isAdmin: boolean
    role: string
  }

  export interface Session {
    user: User
  }

  export interface JWT {
    user: {
      id: string
      role: string
    }
  }
}

declare module '@auth/core/adapters' {
  //@ts-ignore this bullshit
  export interface AdapterUser extends DefaultAdapterUser {
    isAdmin: boolean
    id: string
    role: string
  }
}

export const authConfig: NextAuthConfig = {
  trustHost: true, // for build
  debug: true,
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT as string,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
      sendVerificationRequest,
    }) as EmailConfig & { options: Record<string, unknown> },
    Apple,
    Facebook,
    // GitHub,
    Google,
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) token.role = user.role
      if (trigger === 'update' && session?.name) {
        token.name = session.name
      }
      return token
    },
    async session({ session, user }) {
      session.user.id = user.id
      session.user.role = user.role
      return session
    },
    // authorized({ request, auth }) {
    //   const { pathname } = request.nextUrl
    //   if (pathname === '/create/*') return !!auth

    //   return !!auth?.user
    // },
  },
  pages: {
    signIn: '/signin',
    // signOut: '/auth/signout',
    // error: '/auth/error',
    // verifyRequest: '/auth/verify-request',
  },
  adapter: PostgresAdapter(pool),
  session: {
    strategy: 'jwt',
  },
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)
