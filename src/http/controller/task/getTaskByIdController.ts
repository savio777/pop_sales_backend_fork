import { PrismaTaskRepository } from "@/repository/prisma/prismaTaskRepository";
import { GetTaskByIdUseCase } from "@/usecase/task/getTaskByIdUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export class GetTaskByIdController {
  async handle(req: FastifyRequest, res: FastifyReply){
    const taskByIdRequesParams = z.object({
      taskId: z.string().uuid()
    })
    const {taskId} = taskByIdRequesParams.parse(req.params)

    const taskRepository = new PrismaTaskRepository()
    const getTaskByIdUseCase = new GetTaskByIdUseCase(
      taskRepository
    )

    const task = await getTaskByIdUseCase.execute(taskId)
    return res.status(200).send(task)
  }
}