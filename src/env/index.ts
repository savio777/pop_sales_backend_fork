import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  //App
  NODE_ENV: z.enum(["dev", "test", "production"]).default("dev"),
  PORT: z.coerce.number().default(3333),
  PRIVATE_KEY: z.string(),
  HOST: z.coerce.string(),

  // Database
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DB: z.string(),
  POSTGRES_PORT: z.string(),
  DATABASE_URL: z.string(),
})

const _env = envSchema.safeParse(process.env)

if(_env.success === false){
  console.error("Invalid environment variables", _env.error.format())
  throw new Error("Invalid environment variables")
}

export const env = _env.data