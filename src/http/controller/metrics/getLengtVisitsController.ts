import { GetLenghVisitsUseCase } from "@/usecase/metrics/getLenghVisitsUseCase"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export class GetLenghtVisitsController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const getLengthVisitsRequestParams = z.object({
      userId: z.string()
    })
    const {userId} = getLengthVisitsRequestParams.parse(req.params)
    const getLenghVisitsUseCase = new GetLenghVisitsUseCase()
    
    const visits = await getLenghVisitsUseCase.execute({userId})
    return res.status(200).send({visits})
  }
}