import { TINK_CLIENT_ID, TINK_CLIENT_SECRET } from '$env/static/private'
import { z } from 'zod'

const accessTokenResultSchema = z.object({
  access_token: z.string(),
  expires_in: z.number(),
  token_type: z.string(),
  token_scope: z.string(),
})
export const getAccessToken = async (authorizationCode: string) => {
  return fetch('https://api.tink.com/api/v1/oauth/token', {
    body: `code=${authorizationCode}&client_id=${TINK_CLIENT_ID}&client_secret=${TINK_CLIENT_SECRET}&grant_type=authorization_code`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
  }).then((res) => accessTokenResultSchema.parse(res.json()))
}

export const transasctionResultSchema = z.object({
  nextPageToken: z.string(),
  transactions: z.array(
    z.object({
      accountId: z.string(),
      amount: z.object({
        currencyCode: z.string(),
        value: z.object({ scale: z.string(), unscaledValue: z.string() }),
      }),
      categories: z
        .object({
          pfm: z.object({ id: z.string(), name: z.string() }),
        })
        .optional(),
      dates: z.object({ booked: z.string(), value: z.string().optional() }),
      descriptions: z.object({ display: z.string(), original: z.string() }),
      id: z.string(),
      identifiers: z.object({ providerTransactionId: z.string() }),
      merchantInformation: z
        .object({
          merchantCategoryCode: z.string().optional(),
          merchantName: z.string().optional(),
        })
        .optional(),
      providerMutability: z.string(),
      reference: z.string().optional(),
      status: z.string(),
      types: z.object({
        financialInstitutionTypeCode: z.string().optional(),
        type: z.string(),
      }),
    })
  ),
})
export const getTransactionsFromDate = async (startDate: Date, accessToken: string) => {
  const searchParams = new URLSearchParams()
  searchParams.append('bookedDateGte', startDate.toISOString().substring(0, 10))

  return fetch('https://api.tink.com/data/v2/transactions', {
    body: searchParams.toString(),
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((res) => transasctionResultSchema.parse(res.json()))
}
