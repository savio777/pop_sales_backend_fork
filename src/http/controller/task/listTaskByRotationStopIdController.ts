import { z } from "zod";
import { PrismaTaskRepository } from "@/repository/prisma/prismaTaskRepository";
import { FastifyReply, FastifyRequest } from "fastify";
import { ListTaskByRotationStopIdUseCase } from "@/usecase/task/listTaskByStopIdUseCase";


export class ListTaskByRotationStopIdController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const ListTaskRequestParams = z.object({
      rotationStopId: z.coerce.string().uuid()
    });

    const {rotationStopId} = ListTaskRequestParams.parse(req.params);


    const taskRepository = new PrismaTaskRepository();

    const listTaskByRotationStopIdUseCase = new ListTaskByRotationStopIdUseCase(
      taskRepository
    )

    const tasks = await listTaskByRotationStopIdUseCase.execute(rotationStopId);

    return res.status(200).send(tasks);
  }
}
