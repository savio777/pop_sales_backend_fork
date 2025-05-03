import Fastify from 'fastify';
import { errorHandler } from './error.handle';
import { AppRoutes } from './http/routes/appRoutes';
import jwt from '@fastify/jwt';
import { env } from './env';
import fastifyStatic from '@fastify/static';
import path from 'path';
import multipart from '@fastify/multipart'

export const app = Fastify();

app.register(multipart, {
  limits: {
    fileSize: 5 * 1024 * 1024 // 5 MB
  }
})

app.register(fastifyStatic, {
  root: path.resolve('public'),
  prefix: '/public/',
});

app.setErrorHandler(errorHandler);

app.register(jwt, {
  secret: env.PRIVATE_KEY,
});

app.register(AppRoutes);
