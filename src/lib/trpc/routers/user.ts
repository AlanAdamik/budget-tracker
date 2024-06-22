import { protectedProcedure, router } from '../t'
import { TRPCError } from '@trpc/server'
import prisma from '$lib/server/db'
import { z } from 'zod'

export const userRouter = router({
  default: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input, ctx }) => {
      ctx.session.user
      const user = await prisma.user.findFirst({
        where: { id: input.userId },
      })
      if (!user) throw new TRPCError({ code: 'NOT_FOUND' })
      return user
    }),
})
