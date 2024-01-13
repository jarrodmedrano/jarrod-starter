import EmailProvider, { EmailConfig } from 'next-auth/providers/email'
import NextAuth from 'next-auth'
import type { NextAuthConfig, User } from 'next-auth'
import GitHub from 'next-auth/providers/github'
import { sendVerificationRequest } from './utils/sendVerificationRequest'
import PostgresAdapter from '@auth/pg-adapter'
import { Pool } from 'pg'

const pool = new Pool({
  host: 'localhost',
  user: 'database-user',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

declare module 'next-auth' {
  // eslint-disable-next-line no-unused-vars
  interface Session {
    user: {
      picture?: string
    } & Omit<User, 'id'>
  }
}

export const authConfig = {
  debug: true,
  adapter: PostgresAdapter(pool),
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
    GitHub,
  ],
  callbacks: {
    authorized(params) {
      return !!params.auth?.user
    },
  },
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)
