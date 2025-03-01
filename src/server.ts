import { PrismaClient } from '@prisma/client'
import { app } from './app'

const prisma = new PrismaClient()

app.get('/', async (request, reply) => {
  return { message: 'Olá, Fastify com Prisma!' }
})

app.get('/usuarios', async (request, reply) => {
  const usuarios = await prisma.usuario.findMany()
  return usuarios
})

app.listen({ port: 3000, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Servidor rodando em ${address}`)
})
