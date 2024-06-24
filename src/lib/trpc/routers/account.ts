import { protectedProcedure, router } from '../t'
import { bankNameSchema } from '../types/bank-name'
import { currencySchema } from '../types/currency'
import { TRPCError } from '@trpc/server'
import prisma from '$lib/server/db'
import { z } from 'zod'

export const accountRouter = router({
  create: protectedProcedure
    .input(
      z.object({
        workspaceId: z.string().cuid(),
        name: z.string().min(1),
        bankName: bankNameSchema,
        currency: currencySchema,
      })
    )
    .mutation(async ({ input, ctx }) => {
      const workspace = await prisma.workspace.findFirst({
        where: {
          id: input.workspaceId,
          memberships: {
            some: {
              userId: ctx.session.user.id,
            },
          },
        },
      })

      if (!workspace) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'The workspace does not exist or you do not have access to it.',
        })
      }

      await prisma.bankAccount.create({
        data: {
          name: input.name,
          bankName: input.bankName,
          currency: input.currency,
          workspace: {
            connect: {
              id: workspace.id,
            },
          },
        },
      })
    }),
})
