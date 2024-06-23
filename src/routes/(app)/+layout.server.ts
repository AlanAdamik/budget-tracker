import { redirect } from '@sveltejs/kit'
import type { LayoutServerLoad } from './$types'
import { REDIRECT_GUESTS } from '$lib/config'

export const load: LayoutServerLoad = async function (event) {
  const session = await event.locals.auth()

  if (!session || !session.user) {
    return redirect(403, REDIRECT_GUESTS)
  }

  return {
    session,
  }
}
