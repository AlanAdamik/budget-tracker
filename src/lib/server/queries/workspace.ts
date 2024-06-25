import prisma from '../db'

export function getWorkspaceIfPossible(userId: string, workspaceId: string) {
  return prisma.workspace.findUnique({
    where: {
      id: workspaceId,
      memberships: {
        some: {
          userId,
        },
      },
    },
    include: {
      memberships: {
        where: {
          userId,
        },
      },
    },
  })
}
