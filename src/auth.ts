import { SvelteKitAuth } from '@auth/sveltekit'
import Credentials from '@auth/sveltekit/providers/credentials'
import prisma from '$lib/server/db'
import { credentialsSchema, saltAndHashPassword } from '$lib/password'
import { PrismaAdapter } from '@auth/prisma-adapter'
import GitHub from '@auth/sveltekit/providers/github'

export const { handle, signIn, signOut } = SvelteKitAuth({
  adapter: PrismaAdapter(prisma),
  trustHost: true,
  providers: [
    GitHub,
    Credentials({
      authorize: async (credentials) => {
        let user = null

        const { email, password } = credentialsSchema.parse(credentials)

        const pwHash = saltAndHashPassword(password)
        user = await prisma.user.findFirst({ where: { email, password: pwHash } })

        if (!user) {
          throw new Error('User not found.')
        }

        return user
      },
      credentials: {
        email: {
          type: 'string',
        },
        password: {
          type: 'string',
        },
      },
    }),
  ],
  callbacks: { session: ({ session }) => session },
})
