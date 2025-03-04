import { app } from './app'
import { env } from './lib/env'

app.get('/', async (request, reply) => {
  return { message: 'Olá, Fastify com Prisma!' }
})

app.listen({
  host: "0.0.0.0",
  port: 3333
}).then(() => {
  console.log('🚀 Http Server Running!')
})