import type { PageServerLoad } from './$types'
import { error } from '@sveltejs/kit'
import { getAccessToken } from '$lib/server/tink'

export const load: PageServerLoad = async (event) => {
  const authorizationCode = event.url.searchParams.get('code')
  const credentialsId = event.url.searchParams.get('credentialsId')

  if (!authorizationCode) {
    return error(400, 'Missing authorization code')
  }

  if (!credentialsId) {
    return error(400, 'Missing credentialsId')
  }

  const accessToken = await getAccessToken(authorizationCode)

  return {
    authorizationCode,
    accessToken,
  }
}
