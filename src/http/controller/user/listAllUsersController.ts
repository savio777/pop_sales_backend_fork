import { db } from "@/lib/prisma";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export class ListAllUsersController {
  async handler(req: FastifyRequest, res: FastifyReply) {
    const requestQuery = z.object({
      page: z.coerce.number().min(1).default(1),
      limit: z.coerce.number().min(1).default(100),
    });

    const { page, limit } = requestQuery.parse(req.query);

    const offset = (page - 1) * limit;
    const result = await db.user.findMany({
      take: limit,
      skip: offset,
      include: {
        companys: {
          include: {
            Company: true,
          },
        },
      },
    });

    return res.status(200).send({ users: result, page, limit });
  }
}
