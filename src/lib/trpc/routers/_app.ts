import { router } from '../t'
import { bankAccountRouter } from './bank-account'
import { bankAccountLineRouter } from './bank-account-line'
import { categoryRouter } from './category'
import { payeeRouter } from './payee'
import { ruleRouter } from './rule'
import { workspaceRouter } from './workspace'
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server'

export const appRouter = router({
  workspace: workspaceRouter,
  bankAccount: bankAccountRouter,
  category: categoryRouter,
  payee: payeeRouter,
  rule: ruleRouter,
  bankAccountLine: bankAccountLineRouter,
})

export type Router = typeof appRouter

export type RouterInputs = inferRouterInputs<Router>
export type RouterOutputs = inferRouterOutputs<Router>
