import { app } from './app'
import { env } from './env'

app.get('/', async (request, reply) => {
  return { message: 'Olá, Fastify com Prisma!' }
})

app.listen({
  host: env.HOST,
  port: env.PORT
}).then(() => {
  console.log('🚀 Http Server Running!')
})