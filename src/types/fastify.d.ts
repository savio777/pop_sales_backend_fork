import { Permission, User } from "@prisma/client";

declare module "fastify" {
  interface FastifyRequest {
    userAuth: (User & { Permission: Permission[] }) | null;
  }
}
