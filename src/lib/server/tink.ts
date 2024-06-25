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
