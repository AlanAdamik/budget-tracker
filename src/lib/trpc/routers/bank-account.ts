import { bankAccountProcedure, router, workspaceMemberProcedure } from '../t'
import { bankNameSchema } from '../types/bank-name'
import { currencySchema } from '../types/currency'
import prisma from '$lib/server/db'
import { z } from 'zod'

export const bankAccountRouter = router({
  fromWorkspace: workspaceMemberProcedure.query(async ({ ctx }) =>
    prisma.bankAccount.findMany({
      where: {
        workspaceId: ctx.workspace.id,
      },
    })
  ),
  delete: bankAccountProcedure.mutation(async ({ ctx }) =>
    prisma.bankAccount.delete({
      where: {
        id: ctx.bankAccount.id,
      },
    })
  ),
  create: workspaceMemberProcedure
    .input(
      z.object({
        name: z.string().min(1),
        bankName: bankNameSchema,
        currency: currencySchema,
      })
    )
    .mutation(async ({ input, ctx }) => {
      await prisma.bankAccount.create({
        data: {
          name: input.name,
          bankName: input.bankName,
          currency: input.currency,
          workspace: {
            connect: {
              id: ctx.workspace.id,
            },
          },
        },
      })
    }),
})
