#!/usr/bin/env node
const { execSync } = require("child_process");

// Set build environment variable
process.env.BUILDING = "true";

// Run prisma generate
console.log("Generating Prisma Client...");
execSync("prisma generate", { stdio: "inherit" });

// Run next build with the environment variable set
console.log("Building Next.js...");
execSync("next build", { stdio: "inherit", env: { ...process.env, BUILDING: "true" } });
