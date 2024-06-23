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
  addWorkspace: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ input, ctx }) => {
      await prisma.workspace.create({
        data: {
          name: input.name,
          memberships: {
            create: {
              role: 'OWNER',
              userId: ctx.session.user.id,
            },
          },
        },
      })
    }),
  workspaces: protectedProcedure.query(async ({ ctx }) => {
    return await prisma.workspace.findMany({
      include: {
        bankAccounts: true,
        memberships: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
      where: {
        memberships: {
          some: {
            userId: ctx.session.user.id,
          },
        },
      },
    })
  }),
})
