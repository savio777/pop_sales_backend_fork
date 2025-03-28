import { db } from "@/lib/prisma";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export class ListClientsByCompanyController {
  async handle(req: FastifyRequest, res: FastifyReply){
    const listClientsByCompanyRequestParams = z.object({
      companyId: z.string().uuid()
    })
    const {companyId} = listClientsByCompanyRequestParams.parse(req.params)

    const clients = await db.client.findMany({
      where: {
        companyId
      }
    })

    return {clients}
  }
}