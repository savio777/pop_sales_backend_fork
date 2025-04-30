import { PrismaOccurrenceRepository } from "@/repository/prisma/prismaOccurrenceRepository";
import { GetOccurrenceByIdUseCase } from "@/usecase/occurrence/getOccurrenceByIdUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export class GetOccurrenceByIdController {
  async handler(req: FastifyRequest, res: FastifyReply) {
    const requestParams = z.object({
      id: z.string().uuid(),
    });
    const { id } = requestParams.parse(req.params);
    
    const prismaOcuurrenceRepository = new PrismaOccurrenceRepository();
    const getOccurrenceByIdUseCase = new GetOccurrenceByIdUseCase(
      prismaOcuurrenceRepository
    );

    const occurrence = await getOccurrenceByIdUseCase.execute(id);

    return res.status(200).send(occurrence);
  }
}
