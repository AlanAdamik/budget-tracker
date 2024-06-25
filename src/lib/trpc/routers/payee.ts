import { router, workspaceMemberProcedure } from '../t'
import prisma from '$lib/server/db'
import { z } from 'zod'

export const payeeRouter = router({
  delete: workspaceMemberProcedure
    .input(z.object({ payeeId: z.string().cuid() }))
    .mutation(async ({ input }) =>
      prisma.payee.delete({
        where: {
          id: input.payeeId,
        },
      })
    ),
  create: workspaceMemberProcedure
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
