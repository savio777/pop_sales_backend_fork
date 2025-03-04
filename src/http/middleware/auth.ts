import { UnauthorizedError } from "@/error/unauthorized.error";
import { FastifyReply, FastifyRequest } from "fastify";

export async function Auth(req: FastifyRequest, _res: FastifyReply) {
  if (!req.headers.authorization) {
    throw new UnauthorizedError("Token not provided")
  }
  await req.jwtVerify();
}
