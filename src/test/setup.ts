import { PrismaClient } from "@prisma/client";
import { afterAll, beforeAll } from "vitest";

export const prisma = new PrismaClient();

beforeAll(async () => {
  await prisma.$connect();
});

afterAll(async () => {
  await prisma.$disconnect();
});
