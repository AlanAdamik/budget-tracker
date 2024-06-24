import { protectedProcedure, router, workspaceProcedure } from '../t'
import prisma from '$lib/server/db'
import { z } from 'zod'

export const workspaceRouter = router({
  findAllAccessible: protectedProcedure.query(async ({ ctx }) => {
    return await prisma.workspace.findMany({
      where: {
        memberships: {
          some: {
            userId: ctx.session.user.id,
          },
        },
      },
    })
  }),
  findOne: workspaceProcedure.query(async ({ ctx }) => {
    return prisma.workspace.findFirstOrThrow({
      where: {
        id: ctx.workspace.id,
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
