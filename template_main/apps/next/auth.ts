import { LoginSchema } from './../../packages/schema/login'
import { User as DefaultUser } from '@auth/core/types'
import { AdapterUser as DefaultAdapterUser } from '@auth/core/adapters'
import Google from 'next-auth/providers/google'
import Facebook from 'next-auth/providers/facebook'
import Apple from 'next-auth/providers/apple'
// import EmailProvider, {
//   EmailConfig,
//   SendVerificationRequestParams,
// } from 'next-auth/providers/email'
import NextAuth from 'next-auth'
import type { NextAuthConfig } from 'next-auth'
import bcrypt from 'bcryptjs'
import Credentials from 'next-auth/providers/credentials'

// import GitHub from 'next-auth/providers/github'
// import { sendVerificationRequest as sendEmail } from './utils/sendVerificationRequest'
import PostgresAdapter from '@auth/pg-adapter'
import { Pool } from 'pg'
import fetchUser from './actions/user/getUserById'
import fetchUserByEmail from './actions/user/getUserByEmail'
import fetchAccount from './actions/user/getAccountById'
import updateUser from './actions/user/updateUser'

const pool = new Pool({
  host: process.env.DATABASE_HOST || 'postgres12',
  user: process.env.DATABASE_USER || 'root',
  port: 5498,
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
    email: string
  }
}

// @ts-ignore email is experimental
export const authConfig: NextAuthConfig = {
  trustHost: true, // for build
  debug: true,
  providers: [
    Credentials({
      // @ts-ignore this
      async authorize(credentials: Partial<Record<string, unknown>>) {
        const validatedFields = LoginSchema.safeParse(credentials)

        if (validatedFields.success) {
          const { email, password } = validatedFields.data

          const user = await fetchUserByEmail({
            email,
          })
          if (!user || !user.password) return null

          const passwordsMatch = await bcrypt.compare(password, user.password)

          if (passwordsMatch) return user
        }

        return null
      },
    }),
    // EmailProvider({
    //   server: {
    //     host: process.env.EMAIL_SERVER_HOST,
    //     port: process.env.EMAIL_SERVER_PORT as string,
    //     auth: {
    //       user: process.env.EMAIL_SERVER_USER,
    //       pass: process.env.EMAIL_SERVER_PASSWORD,
    //     },
    //   },
    //   from: process.env.EMAIL_FROM,
    //   sendVerificationRequest,
    // }) as EmailConfig & { options: Record<string, unknown> },
    Apple,
    Facebook,
    // GitHub,
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  events: {
    async linkAccount({ user, account }) {
      if (user && account) {
        await updateUser({
          id: Number(user.id),
          emailverified: new Date(),
          name: null,
          email: null,
          image: null,
          password: null,
          role: null,
          istwofactorenabled: null,
          twofactorconfirmation: null,
          locale: null,
        })
      }
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth without email verification
      if (account?.provider !== 'credentials') return true

      const existingUser = await fetchUserByEmail({
        email: user.email || null,
      })

      // Prevent sign in without email verification
      if (!existingUser?.emailverified) return false

      return true
    },
    async jwt({ token }) {
      if (!token.sub) return token

      const existingUser = await fetchUser({
        id: Number(token.sub),
      })

      if (!existingUser) return token

      const existingAccount = await fetchAccount({
        id: existingUser.id,
      })

      // token.isOAuth = !!existingAccount
      token.isOAuth = !!existingAccount
      token.name = existingUser.name
      token.email = existingUser.email
      token.role = existingUser.role
      // token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled

      return token
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }

      if (token.role && session.user) {
        session.user.role = token.role as string
      }

      if (session.user) {
        session.user.name = token.name
        session.user.email = token.email
      }

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
    // error: '/auth/error',
    // signOut: '/auth/signout',
    verifyRequest: '/verify',
  },
  adapter: PostgresAdapter(pool),
  session: {
    strategy: 'jwt',
  },
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)
