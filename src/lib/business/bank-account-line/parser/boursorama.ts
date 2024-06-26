import type { BankAccountLine } from '@prisma/client'
import { z } from 'zod'

const config = {
  columns: true,
  skip_empty_lines: true,
  bom: true,
  quote: '"',
  delimiter: ';',
  fromLine: 1,
}

const boursoramaLineSchema = z.object({
  dateOp: z.string().transform((d) => new Date(d)),
  label: z.string(),
  amount: z
    .string()
    .transform((s) =>
      parseFloat(new Number(s.replaceAll(' ', '').replaceAll(',', '.')).toPrecision(2))
    ),
})
type BoursoramaLine = z.infer<typeof boursoramaLineSchema>

function mapper(row: BoursoramaLine): Pick<BankAccountLine, 'amount' | 'date' | 'label'> {
  const boursoramaRow = boursoramaLineSchema.parse(row)
  return {
    amount: boursoramaRow.amount,
    date: boursoramaRow.dateOp,
    label: boursoramaRow.label,
  }
}

export const boursoramaParser = {
  config,
  mapper,
}
