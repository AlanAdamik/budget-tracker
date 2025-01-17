import { router } from '../t'
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server'

export const appRouter = router({})

export type Router = typeof appRouter

export type RouterInputs = inferRouterInputs<Router>
export type RouterOutputs = inferRouterOutputs<Router>
