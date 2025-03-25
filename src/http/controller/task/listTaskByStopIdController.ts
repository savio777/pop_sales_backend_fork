import { z } from "zod";
import { PrismaUserRepository } from "@/repository/prisma/prismaUserRepository";
import { PrismaTaskRepository } from "@/repository/prisma/prismaTaskRepository";
import { FastifyReply, FastifyRequest } from "fastify";
import { ListTaskByStopIdUseCase } from "@/usecase/task/listTaskByStopIdUseCase";
import { PrismaStopRepository } from "@/repository/prisma/prismaStopRepository";


export class ListTaskByStopIdController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const ListTaskRequestSchema = z.object({
      stopId: z.string().uuid(),
      page: z.coerce.number().default(1),
      limit: z.coerce.number().default(200)
    });

    const data = ListTaskRequestSchema.parse(req.query);

    const stopRepository = new PrismaStopRepository();
    const taskRepository = new PrismaTaskRepository();

    const listTaskUseCase = new ListTaskByStopIdUseCase(
      taskRepository, stopRepository
    );

    const result = await listTaskUseCase.execute(data);

    return res.status(200).send(result);
  }
}
