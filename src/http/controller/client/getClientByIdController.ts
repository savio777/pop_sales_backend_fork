import { db } from "@/lib/prisma";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export class GetClientByIdController {
  async handle(req: FastifyRequest, res: FastifyReply){
    const getClientRequestParams = z.object({
      clientId: z.string().uuid()
    })
    const {clientId} = getClientRequestParams.parse(req.params)
    const client = await db.client.findUnique({
      where: {
        id: clientId
      }
    })

    return res.status(200).send({client})
  }
}