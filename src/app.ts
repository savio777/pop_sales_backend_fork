import Fastify from 'fastify';
import { errorHandler } from './error.handle';
import { AppRoutes } from './http/routes/appRoutes';
import jwt from '@fastify/jwt';
import { env } from './env';
import fastifyStatic from '@fastify/static';
import path from 'path';
import multipart from '@fastify/multipart'
import fastifyCors from '@fastify/cors'
import cookie from '@fastify/cookie';

export const app = Fastify();

app.register(fastifyCors, {
  origin: 'http://localhost:3000', // Endereço do seu frontend
  credentials: true, // Isso permite que cookies sejam enviados e recebidos
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
});

app.register(cookie, {
  secret: env.PRIVATE_COOKIE_KEY
});

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
