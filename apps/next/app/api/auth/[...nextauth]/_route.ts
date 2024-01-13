// import NextAuth, { NextAuthConfig } from 'next-auth'
// import GithubProvider from 'next-auth/providers/github'
// import FacebookProvider from 'next-auth/providers/facebook'
// import GoogleProvider from 'next-auth/providers/google'
// import AppleProvider from 'next-auth/providers/apple'
// import Email from 'next-auth/providers/email'
// import PostgresAdapter from '@auth/pg-adapter'
// import { Pool } from 'pg'

// const pool = new Pool({
//   host: 'localhost',
//   user: 'database-user',
//   max: 20,
//   idleTimeoutMillis: 30000,
//   connectionTimeoutMillis: 2000,
// })

// const authOptions: NextAuthConfig = {
//   adapter: PostgresAdapter(pool),
//   providers: [
//     Email({
//       type: 'email',
//       async sendVerificationRequest({ identifier: email }) {
//         // eslint-disable-next-line no-console
//         console.log(email)
//       },
//     }),
//     AppleProvider({
//       clientId: process.env.APPLE_ID || '',
//       clientSecret: process.env.APPLE_SECRET || '',
//     }),
//     FacebookProvider({
//       clientId: process.env.FACEBOOK_ID || '',
//       clientSecret: process.env.FACEBOOK_SECRET || '',
//     }),
//     GithubProvider({
//       clientId: process.env.GITHUB_ID || '',
//       clientSecret: process.env.GITHUB_SECRET || '',
//     }),
//     GoogleProvider({
//       clientId: process.env.GOOGLE_ID || '',
//       clientSecret: process.env.GOOGLE_SECRET || '',
//     }),
//   ],
// }

// const handler = NextAuth(authOptions)

// export { handler as GET, handler as POST }
