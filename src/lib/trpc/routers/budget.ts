import prisma from '$lib/server/db'
import { z } from 'zod'
import { router, workspaceMemberProcedure } from '../t'

export const budgetRouter = router({
  create: workspaceMemberProcedure
    .input(
      z.object({
        name: z.string().min(1),
        budgetCategories: z.array(
          z.object({
            categoryId: z.string().cuid(),
            amount: z.number(),
          })
        ),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return prisma.$transaction(async (t) => {
        await t.budget.create({
          data: {
            ...input,
            workspaceId: ctx.workspace.id,
            budgetCategories: {
              create: input.budgetCategories.map((bc) => ({
                amount: bc.amount,
                category: {
                  connect: {
                    id: bc.categoryId,
                  },
                },
              })),
            },
          },
        })
      })
    }),
})
