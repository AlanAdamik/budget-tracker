import { PrismaClient, type User } from '@prisma/client'
const prisma = new PrismaClient()

export default prisma

export type UnsafeUser = User
