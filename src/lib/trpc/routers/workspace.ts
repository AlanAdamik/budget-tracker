import { protectedProcedure, router } from '../t'
import { TRPCError } from '@trpc/server'
import prisma from '$lib/server/db'
import { z } from 'zod'

export const workspaceRouter = router({
  findAllAccessible: protectedProcedure.query(async ({ ctx }) => {
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
  findOne: protectedProcedure
    .input(z.object({ id: z.string().cuid() }))
    .query(async ({ ctx, input }) => {
      const membership = await prisma.workspaceMembership.findFirst({
        where: {
          userId: ctx.session.user.id,
          workspaceId: input.id,
        },
      })

      if (!membership) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Your account has no membership with that workspace ID',
        })
      }

      return prisma.workspace.findFirstOrThrow({
        where: {
          id: input.id,
        },
        include: {
          categories: true,
          payees: true,
          rules: true,
          bankAccounts: {
            include: {
              lines: {
                include: {
                  category: true,
                  payee: true,
                },
              },
            },
          },
        },
      })
    }),
  createOne: protectedProcedure
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
})
