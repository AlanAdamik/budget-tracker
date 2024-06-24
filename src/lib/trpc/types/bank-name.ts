import { z } from 'zod'

export const bankNames = [
  'BOURSORAMA',
  'BNP_PARIBAS',
  'CAISSE_EPARGNE',
  'CIC',
  'CREDIT_AGRICOLE',
  'CREDIT_MUTUEL',
  'FORTUNEO',
  'HELLO_BANK',
  'HSBC',
  'ING',
  'LA_BANQUE_POSTALE',
  'LCL',
  'MONABANQ',
  'NICKEL',
  'N26',
  'ORANGE_BANK',
  'REVOLUT',
  'SOCIETE_GENERALE',
  'BRED',
  'BOURSORAMA_PRO',
  'BANQUE_POPULAIRE',
  'CREDIT_DU_NORD',
  'AXA_BANQUE',
  'BANQUE_POSTALE_PRO',
  'BANQUE_KOLB',
  'BANQUE_RHONE_ALPES',
] as const
export const bankNameSchema = z.enum(bankNames)
export type BankName = z.infer<typeof bankNameSchema>
