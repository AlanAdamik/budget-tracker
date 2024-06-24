import { bankAccountProcedure, router } from '../t'
import prisma from '$lib/server/db'
import { z } from 'zod'

const transactionInputSchema = z.object({
  date: z.string().min(1),
  amount: z.number(),
  label: z.string(),
  payeeId: z.string().min(1).cuid().nullable(),
  categoryId: z.string().min(1).cuid().nullable(),
})

export const bankAccountLineRouter = router({
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
