import { z } from "zod";
import { PrismaCompanyRepository } from "@/repository/prisma/prismaCompanyRepository";
import { PrismaUserRepository } from "@/repository/prisma/prismaUserRepository";
import { PrismaTaskRepository } from "@/repository/prisma/prismaTaskRepository";
import { FastifyReply, FastifyRequest } from "fastify";
import { ListTaskUseCase } from "@/usecase/task/listTaskUseCase";


export class ListTaskController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const ListTaskRequestSchema = z.object({
      limit: z.coerce.number().default(200),
      page: z.coerce.number().default(1),
      userCreatedId: z.string().optional(),
      userAssignedId: z.string().optional(),
      companyId: z.string().optional(),
      status: z.enum(["COMPLETED", "PENDING"]).optional(),
      createdAt: z.date().optional(),
      finishedAt: z.date().optional(),
    });

    const data = ListTaskRequestSchema.parse(req.query);

    const companyRepository = new PrismaCompanyRepository();
    const userRepository = new PrismaUserRepository();
    const taskRepository = new PrismaTaskRepository();

    const listTaskUseCase = new ListTaskUseCase(
      taskRepository, userRepository, companyRepository
    );

    const result = await listTaskUseCase.execute(data);

    return res.status(200).send(result);
  }
}
