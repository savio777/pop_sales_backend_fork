import "@fastify/jwt";

declare module "fastify" {
  interface FastifyRequest {
    user: {
      userId: string;
      iat: number,
      exp: number
    };
  }
}
