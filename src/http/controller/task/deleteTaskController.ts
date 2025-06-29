import { PrismaTaskRepository } from "@/repository/prisma/prismaTaskRepository";
import { DeleteTaskUseCase } from "@/usecase/task/deleteTaskUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export class DeleteTaskController {
  async handle(req: FastifyRequest, res: FastifyReply){
    const deleteTaskRequestParams = z.object({
      taskId: z.string().uuid()
    })
    const {taskId} = deleteTaskRequestParams.parse(req.params)

    const taskRepository = new PrismaTaskRepository()
    const deleteTaskUseCase = new DeleteTaskUseCase(
      taskRepository
    )
    await deleteTaskUseCase.execute(taskId)
    return res.status(200).send()
  }
}