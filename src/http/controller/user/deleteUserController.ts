import { NotFoundError } from "@/error/notfound.error";
import { db } from "@/lib/prisma";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export class DeleteUserController {
  async handler(req: FastifyRequest, res: FastifyReply) {
    const requestParams = z.object({
      userId: z.string().uuid(),
    });

    const { userId } = requestParams.parse(req.params);

    const userExist = await db.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!userExist) {
      throw new NotFoundError("Usuário não encontrado");
    }

    await db.userCompany.deleteMany({
      where: {
        userId,
      },
    });

    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        status: "INACTIVE",
      },
    });
  }
}
