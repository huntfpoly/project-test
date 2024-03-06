import { PrismaClient } from "@prisma/client";

// Declare a global variable 'prisma' of type PrismaClient or undefined
declare global {
  var prisma: PrismaClient | undefined;
}

// If the application is running in development mode, assign the 'prisma' instance to the global scope
// This is done to prevent multiple instances of PrismaClient in development, which can lead to too many database connections
export const db = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV === "development") globalThis.prisma = db;
