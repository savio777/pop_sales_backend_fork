import { z } from "zod";
import { PrismaTaskRepository } from "@/repository/prisma/prismaTaskRepository";
import { FastifyReply, FastifyRequest } from "fastify";
import { ListTaskByStopIdUseCase } from "@/usecase/task/listTaskByStopIdUseCase";
import { PrismaStopRepository } from "@/repository/prisma/prismaStopRepository";

export class ListTaskByStopIdController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const ListTaskRequestParams = z.object({
      stopId: z.coerce.string().uuid(),
      page: z.coerce.number().default(1),
      limit: z.coerce.number().default(200)
    });

    const data = ListTaskRequestParams.parse(req.params);

    const taskRepository = new PrismaTaskRepository();
    const stopRepository = new PrismaStopRepository()

    const listTaskByStopIdUseCase = new ListTaskByStopIdUseCase(
      taskRepository,
      stopRepository
    )

    const tasks = await listTaskByStopIdUseCase.execute(data);

    return res.status(200).send(tasks);
  }
}
