import Fastify from 'fastify'
import { errorHandler } from './error.handle'
import { AppRoutes } from './http/routes/appRoutes'
import jwt from '@fastify/jwt';
import { env } from './lib/env';

export const app = Fastify()
app.setErrorHandler(errorHandler)

app.register(jwt, {
  secret: env.PRIVATE_KEY,
});

app.register(AppRoutes)