import Fastify from 'fastify'
import { errorHandler } from './error.handle'
import { AppRoutes } from './http/routes/appRoutes'

export const app = Fastify()
app.setErrorHandler(errorHandler)

app.register(AppRoutes)