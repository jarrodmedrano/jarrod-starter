import { exampleRouter } from './example'
import { healthRouter } from './health'
import { router, _testRouter, mergeRouters } from './trpc'
import { userRouter } from './user'

export const appRouter = router({
  health: healthRouter,
  example: exampleRouter,
  user: userRouter,
})

export const testRouter = _testRouter({
  health: healthRouter,
  example: exampleRouter,
  user: userRouter,
})

export type AppRouter = typeof appRouter

export const routerType = mergeRouters(healthRouter, exampleRouter, userRouter)

export type TRPCRouter = typeof routerType
