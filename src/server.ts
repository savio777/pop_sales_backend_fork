import { app } from './app'
import { env } from './env'

app.get('/', async (request, reply) => {
  return { message: 'Olá, Fastify com Prisma!' }
})

<<<<<<< HEAD
app.listen({ 
  port: env.PORT, 
  host: env.HOST
}).then(() => {
  console.log("🚀 Http Server Running")
})
=======
app.listen({
  host: env.HOST,
  port: env.PORT
}).then(() => {
  console.log('🚀 Http Server Running!')
})
>>>>>>> f8db68553747dfd1eb2b517e68011c24497ec662
