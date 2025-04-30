import { PrismaOccurrenceRepository } from "@/repository/prisma/prismaOccurrenceRepository";
import { CreateOcurrenceUseCase } from "@/usecase/occurrence/createOccurrenceUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export class CreateOccurrenceController {
  async handler(req: FastifyRequest, res: FastifyReply) {
    const requestBody = z.object({
      userId: z.string().uuid(),
      title: z.string(),
      description: z.string(),
      companyId: z.string().uuid(),
    });
    const { companyId, description, title, userId } = requestBody.parse(
      req.body
    );

    const prismaOccurrenceRepsitory = new PrismaOccurrenceRepository();
    const createOccurrenceUseCase = new CreateOcurrenceUseCase(
      prismaOccurrenceRepsitory
    );

    const occurrence = await createOccurrenceUseCase.execute({
      Company: { connect: { id: companyId } },
      User: { connect: { id: userId } },
      title,
      description,
    });

    return res.status(201).send(occurrence);
  }
}
