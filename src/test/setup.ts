import { app } from "@/app";
import { PrismaClient } from "@prisma/client";
import { beforeEach , afterEach, beforeAll} from "vitest";

const db = new PrismaClient()

beforeEach(async () => {
  await app.ready()
  await db.$connect()
})

afterEach(async () => {
  await db.$disconnect()
  await app.close()
})

export {db}