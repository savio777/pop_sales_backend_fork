import { z } from "zod";
import { PrismaTaskRepository } from "@/repository/prisma/prismaTaskRepository";
import { FastifyReply, FastifyRequest } from "fastify";
import { ListTaskByStopIdUseCase } from "@/usecase/task/listTaskByStopIdUseCase";
import { PrismaStopRepository } from "@/repository/prisma/prismaStopRepository";


export class ListTaskByStopIdController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const ListTaskRequestParams = z.object({
      stopId: z.string().uuid(),
    })
    const ListTaskRequestQuery = z.object({
      page: z.coerce.number().default(1),
      limit: z.coerce.number().default(200)
    });

    const {limit, page} = ListTaskRequestQuery.parse(req.query);
    const {stopId} = ListTaskRequestParams.parse(req.params);

    const stopRepository = new PrismaStopRepository();
    const taskRepository = new PrismaTaskRepository();

    const listTaskUseCase = new ListTaskByStopIdUseCase(
      taskRepository, stopRepository
    );

    const result = await listTaskUseCase.execute({
      limit, page, stopId
    });

    return res.status(200).send(result);
  }
}
