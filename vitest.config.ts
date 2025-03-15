import { defineConfig } from 'vitest/config'
import dotenv from 'dotenv'

dotenv.config()

if (process.env.NODE_ENV === 'test' && process.env.DATABASE_URL) {
  process.env.DATABASE_URL = process.env.DATABASE_URL.replace('public', 'test')
}

if (process.env.NODE_ENV === 'test' && process.env.DATABASE_URL && process.env.DATABASE_URL.includes('public')) {
  throw new Error('Não é possível testar com o banco de dados de produção (schema "public")')
}

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    setupFiles: [],
  },
})
