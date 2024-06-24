import { bankAccountProcedure, router, workspaceProcedure } from '../t'
import { bankNameSchema } from '../types/bank-name'
import { currencySchema } from '../types/currency'
import prisma from '$lib/server/db'
import { z } from 'zod'

export const bankAccountRouter = router({
  delete: bankAccountProcedure.mutation(async ({ ctx }) => {
    return prisma.bankAccount.delete({
      where: {
        id: ctx.bankAccount.id,
      },
    })
  }),
  create: workspaceProcedure
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
