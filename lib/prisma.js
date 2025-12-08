// lib/prisma.js
import { PrismaClient } from "@prisma/client";

let prisma;

// Skip Prisma initialization during build
if (process.env.BUILDING === "true") {
  // Return a dummy object during build to prevent errors
  prisma = {
    $connect: async () => {},
    $disconnect: async () => {},
  };
} else if (process.env.NODE_ENV === "production") {
  // In production, create PrismaClient
  prisma = new PrismaClient();
} else {
  // In dev, attach to global to prevent hot-reload duplication
  if (!globalThis.__prisma) {
    globalThis.__prisma = new PrismaClient();
  }
  prisma = globalThis.__prisma;
}

export default prisma;
