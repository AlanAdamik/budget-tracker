import { REDIRECT_GUESTS } from '$lib/config'
import { type Handle, redirect } from '@sveltejs/kit'

// root folder is accessible to anyone (public)
// (app) folder is accessible to authentified users (protected)

export default (async ({ event, resolve }) => {
  function getClientIp() {
    return event.request.headers.get('cf-connecting-ip') || 'LOCALHOST'
  }

  const route = event.route.id
  const isProtected = route?.startsWith('/(app)')

  if (!isProtected) return resolve(event)

  console.log('Got session for checking auth in protectHandle', route)
  const session = await event.locals.auth()
  const user = session?.user

  // protected routes need a user
  if (isProtected && !user) {
    console.log(`${getClientIp()} ${route} failed because no user`)
    redirect(302, REDIRECT_GUESTS)
  }

  return resolve(event)
}) satisfies Handle
