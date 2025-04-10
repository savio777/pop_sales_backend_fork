import { PrismaTaskRepository } from "@/repository/prisma/prismaTaskRepository";
import { UpdateTaskUseCase } from "@/usecase/task/updateTaskUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export class UpdateTaskController {
  async handle(req: FastifyRequest, res: FastifyReply){
    const updateTaskRequestParams = z.object({
      taskId: z.string().uuid()
    })
    const {taskId} = updateTaskRequestParams.parse(req.params)

    const updateTaskRequestBody = z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      status: z.enum(["COMPLETED", "PENDING"]).optional(),
      finishedAt: z.coerce.date().optional()
    })
    const data = updateTaskRequestBody.parse(req.body)

    const taskRepository = new PrismaTaskRepository()
    const updateTaskUseCase = new UpdateTaskUseCase(
      taskRepository
    )

    const task = await updateTaskUseCase.execute({taskId, data})
    return res.status(200).send(task)
  }
}