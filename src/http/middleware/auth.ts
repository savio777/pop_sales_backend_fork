import { UnauthorizedError } from "@/error/unauthorized.error";
import { FastifyReply, FastifyRequest } from "fastify";

export async function Auth(req: FastifyRequest, _res: FastifyReply) {

  await req.jwtVerify();
  req.user = req.user;

  if (!req.headers.authorization) {
    throw new UnauthorizedError("Token not provided")
  }
}
