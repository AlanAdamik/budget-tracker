import type { Context } from './context'
import { initTRPC, TRPCError } from '@trpc/server'
import superjson from 'superjson'
import { z } from 'zod'

export const transformer = superjson
const t = initTRPC.context<Context>().create({
  transformer,
})

export const { router, middleware, createCallerFactory } = t
const auth = middleware(async ({ ctx, next }) => {
  const session = ctx
  if (!session) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }
  return next({ ctx: { session, auth: null as never } })
})

export const publicProcedure = t.procedure
export const protectedProcedure = t.procedure.use(auth)

// create more procedures here
// Example:
// export const itemAccessProcedure = protectedProcedure.input(z.object({ itemId: z.string().cuid() })).query(({ input }) => {
//    return hasAccessToItem(ctx.session.user.id, input.itemId)
// })
