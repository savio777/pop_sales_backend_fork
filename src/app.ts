import Fastify from 'fastify'
import { errorHandler } from './error.handle'
import { AppRoutes } from './http/routes/appRoutes'
import jwt from '@fastify/jwt';
import { env } from './env';
import multipartPlugin from './plugins/multipart';
import fastifyStatic from '@fastify/static';
import path from 'path';

export const app = Fastify();

app.register(multipartPlugin);

app.register(fastifyStatic, {
  root: path.resolve('public'),
  prefix: '/public/',
});

app.setErrorHandler(errorHandler);

app.register(jwt, {
  secret: env.PRIVATE_KEY,
});

app.register(AppRoutes);
