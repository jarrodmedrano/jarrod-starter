import { router, publicProcedure } from './trpc'
import { z } from 'zod'
import { selectUserByEmail } from './queries'
import { RegisterSchema } from 'schema'

export const userRouter = router({
  register: publicProcedure.input(RegisterSchema).query(({ ctx, input }) => {
    ctx.req.log.info(input, 'user')
    return input
  }),
  getUserByEmail: publicProcedure
    .input(
      z.object({
        email: z.string(),
      }),
    )
    .query(async ({ input, ctx }): Promise<any> => {
      // Destructure id from input
      const { email } = input

      // Use the pgPool from the context to query the database
      try {
        const { rows } = await ctx.pool.query(selectUserByEmail, [email])

        if (rows.length === 0) {
          throw new Error('User not found')
        }

        // Assuming rows[0] contains the user data you want to return
        return rows[0]
      } catch (error) {
        // Handle or throw the error appropriately
        throw new Error('Failed to fetch user from the database')
      }
    }),
  getUserById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ input, ctx }): Promise<any> => {
      const { id } = input
      try {
        const { rows } = await ctx.pool.query(selectUserByEmail, [id])

        if (rows.length === 0) {
          throw new Error('User not found')
        }

        return rows[0]
      } catch (error) {
        throw new Error('Failed to fetch user from the database')
      }
    }),
})
