import { genSaltSync, hashSync } from 'bcrypt'
import { z } from 'zod'

export const saltAndHashPassword = (password: string) => hashSync(password, genSaltSync(10))

export const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})
