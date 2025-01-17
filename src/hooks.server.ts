import trpcHandle from './lib/server/trpcHandle'
import { handle as authenticationHandle } from './lib/auth'
import { redirect, type Handle } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'

const PRELOAD_TYPES = ['js', 'css', 'font']

const authorizationHandle: Handle = async ({ event, resolve }) => {
  // Protect any routes under /authenticated
  if (event.url.pathname.startsWith('/authenticated')) {
    const session = await event.locals.auth()
    if (!session) {
      // Redirect to the signin page
      throw redirect(303, '/auth/signin')
    }
  }

  // If the request is still here, just proceed as normally
  return resolve(event)
}

const preloadHandle: Handle = (({ event, resolve }) =>
  resolve(event, {
    preload: ({ type }) => PRELOAD_TYPES.includes(type),
  })) satisfies Handle

export const handle = sequence(authenticationHandle, authorizationHandle, preloadHandle, trpcHandle)
