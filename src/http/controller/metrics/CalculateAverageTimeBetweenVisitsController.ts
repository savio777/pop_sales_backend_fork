import { CalculateAverageTimeBetweenVisitsUseCase } from "@/usecase/metrics/CalculateAverageTimeBetweenVisitsUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export class CalculateAverageTimeBetweenVisitsController {
  async handle(req: FastifyRequest, res: FastifyReply){
    const CalculateAverageTimeBetweenVisitsRequestParams = z.object({
      userId: z.string().uuid(),
    })

    const {userId} = CalculateAverageTimeBetweenVisitsRequestParams.parse(req.params)

    const calculateAverageTimeBetweenVisitsUseCase = new CalculateAverageTimeBetweenVisitsUseCase()
    const averageTime = await calculateAverageTimeBetweenVisitsUseCase.execute({
      userId,
    })

    return res.status(200).send({averageTime})
  }
}