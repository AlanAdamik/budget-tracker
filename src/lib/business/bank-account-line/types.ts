import type { BankAccount, BankAccountLine, Category, Payee } from '@prisma/client'

type Relationships = {
  category: Category | null
  payee: Payee | null
  bankAccount: BankAccount
}

export type MyBankAccountLine<R extends keyof Relationships> = BankAccountLine &
  Pick<Relationships, R>
