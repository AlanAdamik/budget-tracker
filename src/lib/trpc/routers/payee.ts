import { router, workspaceProcedure } from '../t'
import prisma from '$lib/server/db'
import { z } from 'zod'

export const payeeRouter = router({
  create: workspaceProcedure
    .input(
      z.object({
        name: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return prisma.payee.create({
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
