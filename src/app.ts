import Fastify from 'fastify'
import { errorHandler } from './error.handle'

export const app = Fastify()
app.setErrorHandler(errorHandler)