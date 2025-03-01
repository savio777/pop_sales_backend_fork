import "dotenv/config"
import { z } from "zod"

const envSchema = z.object({
  PORT: z.coerce.number(),
  // App
  NODE_ENV: z.enum(["dev", "stage", "production", "test"]),
  PRIVATE_KEY: z.string(),
  HOST: z.coerce.string(),

  // Database
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DB: z.string(),
  POSTGRES_PORT: z.string(),
  DATABASE_URL: z.string()
})

const _env = envSchema.safeParse(process.env)

if(!_env.success){
  console.error("Invalid Environment variables", _env.error.format())

  throw new Error("Invalid Environment variables")
}

export const env = _env.data