import { router, workspaceProcedure } from '../t'
import prisma from '$lib/server/db'
import { z } from 'zod'

export const categoryRouter = router({
  create: workspaceProcedure
    .input(
      z.object({
        name: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return prisma.category.create({
        data: {
          name: input.name,
          workspace: {
            connect: {
              id: ctx.workspace.id,
            },
          },
        },
      })
    }),
})
