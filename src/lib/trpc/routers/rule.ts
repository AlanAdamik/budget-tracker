import { router, workspaceProcedure } from '../t'
import prisma from '$lib/server/db'
import { z } from 'zod'

export const ruleRouter = router({
  create: workspaceProcedure
    .input(
      z.object({
        needle: z.string().min(1),
        categoryId: z.string().min(1).cuid(),
        payeeId: z.string().min(1).cuid().nullable(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const payee = input.payeeId ? { payee: { connect: { id: input.payeeId } } } : {}
      return prisma.rule.create({
        data: {
          needle: input.needle,
          ...payee,
          category: {
            connect: {
              id: input.categoryId,
              // make sure that the category is in the same workspace
              workspaceId: ctx.workspace.id,
            },
          },
          workspace: {
            connect: {
              id: ctx.workspace.id,
            },
          },
        },
      })
    }),
})
