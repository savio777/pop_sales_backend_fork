import { PrismaStopRepository } from "@/repository/prisma/prismaStopRepository";
import { PrismaTaskRepository } from "@/repository/prisma/prismaTaskRepository";
import { CreateTaskUseCase } from "@/usecase/task/createTaskUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export class CreateTaskController {
  async handle(req: FastifyRequest, res: FastifyReply){
    const createTaskRequestBody = z.object({
      title: z.string(), 
      description: z.string().optional(), 
      stopId: z.string().uuid(), 
    })
    
    const data = createTaskRequestBody.parse(req.body)

    const taskRepository = new PrismaTaskRepository()
    const stopRepository = new PrismaStopRepository()

    const createTaskUseCase = new CreateTaskUseCase(
      taskRepository,
      stopRepository,
    )

    const task = await createTaskUseCase.execute(data)
    return res.status(200).send(task)
  }
}