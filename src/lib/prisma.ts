// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client'

declare global {
  // Allow global `prisma` to persist across hot-reloads in development
  // (prevents exhausting your database connection pool)
  var prisma: PrismaClient | undefined
}

export const prisma =
  global.prisma ||
  new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma
}
