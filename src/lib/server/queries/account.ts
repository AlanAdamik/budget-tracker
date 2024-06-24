import prisma from '../db'

export const getBankAccountIfPossible = async (userId: string, bankAccountId: string) => {
  const bankAccount = await prisma.bankAccount.findFirst({
    where: {
      id: bankAccountId,
      workspace: {
        memberships: {
          some: {
            userId,
          },
        },
      },
    },
  })
  return bankAccount
}
