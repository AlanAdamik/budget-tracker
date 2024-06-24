import { router } from '../t'
import { accountRouter } from './account'
import { workspaceRouter } from './workspace'
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server'

export const appRouter = router({
  workspace: workspaceRouter,
  account: accountRouter,
})

export type Router = typeof appRouter

export type RouterInputs = inferRouterInputs<Router>
export type RouterOutputs = inferRouterOutputs<Router>
