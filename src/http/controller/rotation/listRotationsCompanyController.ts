import { db } from "@/lib/prisma";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export class ListRotationsByCompanyIdController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const listRotationByCompanyIdRequestParams = z.object({
      companyId: z.string().uuid(),
    });

    const { companyId } = listRotationByCompanyIdRequestParams.parse(
      req.params
    );

    const rotations = await db.rotation.findMany({
      where: {
        companyId,
      },
      include: {
        users: {
          include: {
            User: true,
          },
        },
        stops: {
          include: {
            client: true,
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return res.status(200).send({ rotations });
  }
}
