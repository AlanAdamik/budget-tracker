import { SvelteKitAuth } from '@auth/sveltekit'
import GitHub from '@auth/sveltekit/providers/github'
import { AUTH_SECRET } from '$env/static/private'

export const { handle, signIn, signOut } = SvelteKitAuth({
  providers: [GitHub],
  secret: AUTH_SECRET,
  trustHost: true,
})
