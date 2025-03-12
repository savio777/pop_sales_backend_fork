import { BadRequestError } from "@/error/badRequest.error";
import { PrismaCompanyRepository } from "@/repository/prisma/prismaCompanyRepository";
import { PrismaTaskRepository } from "@/repository/prisma/prismaTaskRepository";
import { PrismaUserRepository } from "@/repository/prisma/prismaUserRepository";
import { CreateTaskUseCase } from "@/usecase/task/createTaskUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export class CreateTaskController {
  async handle(req: FastifyRequest, res: FastifyReply){

    const userCreatedId = req.userAuth.id

    const createTaskRequestBody = z.object({
      companyId: z.string().uuid(),
      title: z.string(), 
      description: z.string().optional(), 
      rotationId: z.string().uuid(), 
      userAssignedId: z.string().uuid()
    })
    const data = createTaskRequestBody.parse(req.body)

    const taskRepository = new PrismaTaskRepository()
    const companyRepository = new PrismaCompanyRepository()
    const userRepository = new PrismaUserRepository()

    const createTaskUseCase = new CreateTaskUseCase(
      taskRepository,
      companyRepository,
      userRepository
    )

    const task = await createTaskUseCase.execute({...data, userCreatedId})
    return res.status(200).send(task)
  }
}