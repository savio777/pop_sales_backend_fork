import { app } from './app'
import { env } from './lib/env'

app.get('/', async (request, reply) => {
  return { message: 'Olá, Fastify com Prisma!' }
})

app.listen({ 
  port: env.PORT, 
  host: env.HOST
}).then(() => {
  console.log("🚀 Http Server Running")
})
