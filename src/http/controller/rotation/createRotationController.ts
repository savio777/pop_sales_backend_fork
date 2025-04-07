import { PrismaCompanyRepository } from "@/repository/prisma/prismaCompanyRepository";
import { PrismaRotationRepository } from "@/repository/prisma/prismaRotationRepository";
import { PrismaUserRepository } from "@/repository/prisma/prismaUserRepository";
import { PrismaUserRotaionRepository } from "@/repository/prisma/prismaUserRotationRepository";
import { CreateRotationUseCase } from "@/usecase/rotation/createRotationUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export class CreateRotationController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const assignedRequestBody = z.object({
      companyId: z.string().uuid(),
      userId: z.string().uuid()
    });

    const { companyId, userId } = assignedRequestBody.parse(req.body);

    const rotationRepository = new PrismaRotationRepository();
    const companyRepository = new PrismaCompanyRepository()
    const userRotationRepository = new PrismaUserRotaionRepository()
    const userRepository = new PrismaUserRepository()

    const createRotationUseCase = new CreateRotationUseCase(
      rotationRepository,
      companyRepository,
      userRotationRepository,
      userRepository
    );
    
    const rotation = await createRotationUseCase.execute({
      companyId, userId
    });

    return res.status(200).send(rotation);
  }
}
