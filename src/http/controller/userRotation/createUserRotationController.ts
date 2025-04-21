import { PrismaRotationRepository } from "@/repository/prisma/prismaRotationRepository";
import { PrismaUserRepository } from "@/repository/prisma/prismaUserRepository";
import { PrismaUserRotaionRepository } from "@/repository/prisma/prismaUserRotationRepository";
import { CreateUserRotationUseCase } from "@/usecase/userRotation/createUserRotationUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export class CreateUserRotationController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const createUserRotationRequestBody = z.object({
      userId: z.string().uuid(),
      rotationId: z.string().uuid(),
    });

    const data = createUserRotationRequestBody.parse(req.body);

    const userRepository = new PrismaUserRepository();
    const rotationRepository = new PrismaRotationRepository();
    const userRotationRepository = new PrismaUserRotaionRepository();

    const createUserRotationUseCase = new CreateUserRotationUseCase(
      userRepository,
      rotationRepository,
      userRotationRepository
    );

    const userRotation = await createUserRotationUseCase.execute(data);

    return res.status(201).send(userRotation);
  }
}
