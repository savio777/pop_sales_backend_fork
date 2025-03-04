import { UnauthorizedError } from "@/error/unauthorized.error";
import { db } from "@/lib/prisma";
import { FastifyReply, FastifyRequest } from "fastify";

interface UserRequest {
  userId: string
}

export async function Auth(req: FastifyRequest, _res: FastifyReply) {
  if (!req.headers.authorization) {
    throw new UnauthorizedError("Token not provided")
  }
  await req.jwtVerify();

  const userPayload = req.user as UserRequest;
  
  const user = await db.user.findUnique({
    where: {
      id: userPayload.userId
    },
    include: {
      Permission: true
    }
  })

  req.userAuth = user
}
