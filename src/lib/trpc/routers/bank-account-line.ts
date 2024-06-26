import { bankAccountProcedure, router, workspaceMemberProcedure } from '../t'
import prisma from '$lib/server/db'
import { z } from 'zod'
import type { Prisma } from '@prisma/client'

const include: Prisma.BankAccountLineInclude = {
  bankAccount: true,
  category: true,
  payee: true,
}

const transactionInputSchema = z.object({
  date: z.string().min(1),
  amount: z.number(),
  label: z.string(),
  payeeId: z.string().min(1).cuid().nullable(),
  categoryId: z.string().min(1).cuid().nullable(),
})

export const bankAccountLineRouter = router({
  fromWorkspace: workspaceMemberProcedure.query(async ({ ctx }) =>
    prisma.bankAccountLine.findMany({
      where: {
        bankAccount: {
          workspaceId: ctx.workspace.id,
        },
      },
      include,
    })
  ),
  createMany: bankAccountProcedure
    .input(
      z.object({
        transactions: z.array(transactionInputSchema),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return prisma.bankAccountLine.createMany({
        data: input.transactions.map(({ amount, date, label, categoryId, payeeId }) => ({
          amount,
          date: new Date(date),
          label,
          bankAccountId: ctx.bankAccount.id,
          categoryId,
          payeeId,
        })),
      })
    }),
  createOne: bankAccountProcedure.input(transactionInputSchema).mutation(async ({ ctx, input }) => {
    const payee = input.payeeId ? { payee: { connect: { id: input.payeeId } } } : {}
    const category = input.categoryId ? { category: { connect: { id: input.categoryId } } } : {}
    return await prisma.bankAccountLine.create({
      data: {
        date: new Date(input.date),
        amount: input.amount,
        label: input.label,
        bankAccount: {
          connect: {
            id: ctx.bankAccount.id,
          },
        },
        ...payee,
        ...category,
      },
    })
  }),
})
