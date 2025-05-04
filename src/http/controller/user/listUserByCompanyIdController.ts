import { NotFoundError } from "@/error/notfound.error";
import { db } from "@/lib/prisma";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export class ListUserByCompanyIdController {
  async handler(req: FastifyRequest, res: FastifyReply){
    const requestParams = z.object({
      companyId: z.string().uuid(),
    })

    const requestQuery = z.object({
      page: z.coerce.number().min(1).default(1),
      limit: z.coerce.number().min(1).default(100),
    })

    const { companyId } = requestParams.parse(req.params)
    const { page, limit } = requestQuery.parse(req.query)

    const company = await db.company.findUnique({
      where: {
        id: companyId,
      },
    })

    if(!company){
      throw new NotFoundError("Empresa não encontrada")
    }

    const offset = (page - 1) * limit
    const users = await db.user.findMany({
      where: {
        companys: {
          some: { 
            id: companyId,
          }
        },
      },
      take: limit,
      skip: offset,
    })

    return res.status(200).send({users})
  }
}