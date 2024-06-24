import { z } from 'zod'

export const currencies = [
  'USD',
  'EUR',
  'JPY',
  'GBP',
  'AUD',
  'CAD',
  'CHF',
  'CNY',
  'SEK',
  'NZD',
] as const

export const currencySchema = z.enum(currencies)
export type Currency = z.infer<typeof currencySchema>
