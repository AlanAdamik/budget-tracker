import type { BankName } from '$lib/trpc/types/bank-name'
import type { BankAccountLine } from '@prisma/client'
import { parse } from 'csv-parse/browser/esm/sync'
import { boursoramaParser } from './boursorama'

const bankSpecs: Partial<
  Record<
    BankName,
    {
      config: any
      mapper: (row: any) => Pick<BankAccountLine, 'amount' | 'date' | 'label'>
    }
  >
> = {
  BOURSORAMA: boursoramaParser,
}

export function parseFile(text: string, bank: BankName) {
  const bankSpec = bankSpecs[bank]
  if (!bankSpec) {
    throw new Error('could not parse bank file')
  }
  return parse(text, bankSpec?.config).map(bankSpec.mapper)
}
