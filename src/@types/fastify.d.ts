import "@fastify/jwt";

declare module "fastify" {
  interface FastifyRequest {
    user: {
      id: string;
      nome: string;
      email: string;
    };
  }
}
