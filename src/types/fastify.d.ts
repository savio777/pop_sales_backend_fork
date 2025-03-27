import { Permission, User } from "@prisma/client";

declare module "fastify" {
  interface FastifyRequest {
    userAuth?: {
      id: string;
      status: string;
      permissions: {
        Permission: {
          permissions: string[]; 
        } | null;
      }[]; 
    };
  }
}
