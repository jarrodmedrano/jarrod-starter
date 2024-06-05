import { Pool } from 'pg'

import { inferAsyncReturnType } from '@trpc/server'
import { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify'
// Reference required for compilation
import type fastify from 'fastify'

const pool = new Pool({
  host: process.env.DATABASE_HOST || 'database',
  user: process.env.DATABASE_USER || 'root',
  port: 5498,
  password: process.env.DATABASE_SECRET || 'secret',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  database: process.env.DATABASE_NAME || 'starter-app',
})
// eslint-disable-next-line @typescript-eslint/require-await
export async function createContextInner() {
  return {
    pool,
  }
}

// eslint-disable-next-line @typescript-eslint/require-await
export async function createContext({ req, res }: CreateFastifyContextOptions) {
  const server = req.server

  return {
    fastify: server,
    req,
    res,
    pool,
  }
}

export type Context = inferAsyncReturnType<typeof createContext>
export type InnerContext = inferAsyncReturnType<typeof createContextInner>
