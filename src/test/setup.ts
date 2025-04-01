import { beforeAll, afterAll } from "vitest";
import { PrismaClient } from "@prisma/client";
import { app } from "@/app";

const db = new PrismaClient();

beforeAll(async () => {
  await db.$connect();
  await app.ready();
});

afterAll(async () => {
  await db.$disconnect();
});

export { db };
