import { router, workspaceMemberProcedure } from '../t'
import prisma from '$lib/server/db'
import { z } from 'zod'

export const categoryRouter = router({
  delete: workspaceMemberProcedure
    .input(z.object({ categoryId: z.string().cuid() }))
    .mutation(async ({ input }) =>
      prisma.category.delete({
        where: {
          id: input.categoryId,
        },
      })
    ),
  create: workspaceMemberProcedure
    .input(
      z.object({
        name: z.string().min(1),
        monthlyBudget: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return prisma.category.create({
        data: {
          name: input.name,
          monthlyBudget: input.monthlyBudget,
          workspace: {
            connect: {
              id: ctx.workspace.id,
            },
          },
        },
      })
    }),
})
