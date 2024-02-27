import { z } from 'zod'

export const RegisterSchema = z.object({
  email: z.string().email({
    message: 'Email is required',
  }),
})
