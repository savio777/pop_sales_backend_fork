import { app } from './app'
import { env } from './lib/env'

app.get('/', async (request, reply) => {
  return { message: 'Olá, Fastify com Prisma!' }
})

app.listen(
  { port: env.PORT, host: env.HOST },
  (err, address) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    console.log(`Servidor rodando em ${address}`)
  }
)
