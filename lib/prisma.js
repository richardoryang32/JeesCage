// lib/prisma.js
import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig } from "@neondatabase/serverless";
import ws from "ws";

let prisma;

// Configure Neon
neonConfig.webSocketConstructor = ws;

// Skip Prisma initialization during build
if (process.env.BUILDING === "true") {
  // Return a dummy object during build to prevent errors
  prisma = {
    $connect: async () => {},
    $disconnect: async () => {},
  };
} else {
  // Create Neon adapter for Prisma v7
  const adapter = new PrismaNeon({
    connectionString: process.env.DATABASE_URL || '',
    directUrl: process.env.DIRECT_URL,
  });

  // Create PrismaClient with adapter
  if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient({ adapter });
  } else {
    // In dev, use global singleton to prevent hot-reload duplication
    if (!globalThis.__prisma) {
      globalThis.__prisma = new PrismaClient({ adapter });
    }
    prisma = globalThis.__prisma;
  }
}

export default prisma;
