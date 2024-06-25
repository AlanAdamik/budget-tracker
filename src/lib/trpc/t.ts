import type { Context } from './context'
import { initTRPC, TRPCError } from '@trpc/server'
import { getBankAccountIfPossible } from '$lib/server/queries/account'
import { getWorkspaceIfPossible } from '$lib/server/queries/workspace'
import superjson from 'superjson'
import { z } from 'zod'

export const transformer = superjson
const t = initTRPC.context<Context>().create({
  transformer,
})

export const { router, middleware, createCallerFactory } = t
const auth = middleware(async ({ ctx, next }) => {
  const session = await ctx.auth()
  if (!session) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }
  return next({ ctx: { session, auth: null as never } })
})

export const publicProcedure = t.procedure
export const protectedProcedure = t.procedure.use(auth)

export const workspaceMemberProcedure = protectedProcedure
  .input(z.object({ workspaceId: z.string().cuid() }))
  .use(async ({ ctx, input, next }) => {
    const workspace = await getWorkspaceIfPossible(ctx.session.user.id, input.workspaceId)
    if (!workspace) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: "Either the workspace doesn't exist or you don't have access to it",
      })
    }
    return next({ ctx: { ...ctx, workspace } })
  })
export const workspaceOwnerProcedure = workspaceMemberProcedure.use(async ({ ctx, next }) => {
  if (['OWNER', 'ADMIN'].includes(ctx.workspace.memberships[0]?.role || 'UNDEFINED')) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: "Either the workspace doesn't exist or you don't have access to it",
    })
  }
  return next({ ctx })
})
export const bankAccountProcedure = protectedProcedure
  .input(z.object({ bankAccountId: z.string().cuid() }))
  .use(async ({ ctx, input, next }) => {
    const bankAccount = await getBankAccountIfPossible(ctx.session.user.id, input.bankAccountId)
    if (!bankAccount) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: "Either the account doesn't exist or you don't have access to it",
      })
    }
    return next({ ctx: { ...ctx, bankAccount } })
  })
