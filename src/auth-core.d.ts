import type { UnsafeUser } from '$lib/server/db'

declare module '@auth/sveltekit' {
  interface Session {
    // Unsafe because it includes email and emailVerified
    user: UnsafeUser
  }
}
