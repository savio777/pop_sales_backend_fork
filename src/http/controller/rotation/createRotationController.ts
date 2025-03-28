import { BadRequestError } from "@/error/badRequest.error";
import { PrismaCompanyRepository } from "@/repository/prisma/prismaCompanyRepository";
import { PrismaRotationRepository } from "@/repository/prisma/prismaRotationRepository";
import { PrismaUserRotaionRepository } from "@/repository/prisma/prismaUserRotationRepository";
import { CreateRotationUseCase } from "@/usecase/rotation/createRotationUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export class CreateRotationController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const userId = req.userAuth!.id
    const assignedRequestBody = z.object({
      companyId: z.string().uuid(),
    });

    const { companyId } = assignedRequestBody.parse(req.body);

    const rotationRepository = new PrismaRotationRepository();
    const companyRepository = new PrismaCompanyRepository()
    const userRotationRepository = new PrismaUserRotaionRepository()

    const createRotationUseCase = new CreateRotationUseCase(
      rotationRepository,
      companyRepository,
      userRotationRepository
    );

    if (!req.userAuth?.id) {
      throw new BadRequestError("userId not informed");
    }
    
    const rotation = await createRotationUseCase.execute({
      companyId, userId
    });

    return res.status(200).send(rotation);
  }
}
