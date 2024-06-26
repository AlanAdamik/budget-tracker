import type { LayoutServerLoad } from './$types'
import { redirect } from '@sveltejs/kit'

export const load: LayoutServerLoad = async (event) => {
  const { workspaceId } = event.params
  if (!workspaceId) {
    return redirect(404, '/dashboard')
  }
  return {
    workspaceId,
  }
}
