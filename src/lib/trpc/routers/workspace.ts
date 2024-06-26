import { protectedProcedure, router, workspaceMemberProcedure, workspaceOwnerProcedure } from '../t'
import prisma from '$lib/server/db'
import { z } from 'zod'

export const workspaceRouter = router({
  delete: workspaceOwnerProcedure.mutation(async ({ ctx }) =>
    prisma.workspace.delete({
      where: {
        id: ctx.workspace.id,
      },
    })
  ),
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
  findOne: workspaceMemberProcedure.query(async ({ ctx }) => {
    return prisma.workspace.findFirstOrThrow({
      where: {
        id: ctx.workspace.id,
      },
      include: {
        categories: true,
        payees: true,
        rules: true,
        budgets: {
          include: {
            budgetCategories: true,
          },
        },
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
