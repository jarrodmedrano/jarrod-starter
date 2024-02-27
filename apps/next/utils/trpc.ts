'use client'

import { httpBatchLink } from '@trpc/client'
import { createTRPCNext } from '@trpc/next'
import type { TRPCRouter } from 'api/src/types'
import superjson from 'superjson'

export const trpc = createTRPCNext<TRPCRouter>({
  config() {
    return {
      links: [
        httpBatchLink({
          /**
           * If you want to use SSR, you need to use the server's full URL
           * @link https://trpc.io/docs/ssr
           **/
          url: `${process.env.FASTIFY_API}/trpc`,
          // You can pass any HTTP headers you wish here
          async headers() {
            return {
              // authorization: getAuthCookie(),
            }
          },
        }),
      ],
      transformer: superjson,
    }
  },
  /**
   * @link https://trpc.io/docs/ssr
   **/
  ssr: false,
})
