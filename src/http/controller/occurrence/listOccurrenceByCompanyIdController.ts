import { PrismaCompanyRepository } from "@/repository/prisma/prismaCompanyRepository";
import { PrismaOccurrenceRepository } from "@/repository/prisma/prismaOccurrenceRepository";
import { ListOccurrenceByCompanyIdUseCase } from "@/usecase/occurrence/listOccurrenceByCompanyIdUsecase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { subDays, startOfDay, endOfDay } from "date-fns";

export class ListOccurrenceByCompanyIdController {
  async handler(req: FastifyRequest, res: FastifyReply) {
    const requestPasrams = z.object({
      companyId: z.string().uuid(),
    });
    const requestQuery = z.object({
      limit: z.coerce.number().min(1).max(200).default(200),
      page: z.coerce.number().min(1).max(200).default(1),
      periodStart: z.coerce
        .date()
        .default(() => startOfDay(subDays(new Date(), 30))),
      periodEnd: z.coerce.date().default(() => endOfDay(new Date())),
    });

    const { companyId } = requestPasrams.parse(req.params);
    const { limit, page, periodEnd, periodStart } = requestQuery.parse(
      req.query
    );

    const prismaOccurrenceRepository = new PrismaOccurrenceRepository();
    const prismaCompanyRepository = new PrismaCompanyRepository();
    const listOccurrenceByCompanyIdUseCase =
      new ListOccurrenceByCompanyIdUseCase(
        prismaOccurrenceRepository,
        prismaCompanyRepository
      );

    const occurrences = await listOccurrenceByCompanyIdUseCase.execute({
      companyId,
      limit,
      page,
      periodEnd,
      periodStart,
    });

    return res.status(200).send(occurrences);
  }
}
