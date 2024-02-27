import fastify, { FastifyServerOptions } from 'fastify'
import sensible from '@fastify/sensible'
import { appRouter } from './routes'
export const build = (opts?: FastifyServerOptions) => {
  const app = fastify(opts)

  app.register(sensible)
  return app
}

export type TRPCRouter = typeof appRouter
