import { CreateUserRotationUseCase } from "@/usecase/userRotation/createUserRotationUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export class CreateUserRotationController {
  async handle(req: FastifyRequest, res: FastifyReply) {

    const createUserRotationRequestBody = z.object({
      userId: z.string().uuid(),
      rotationId: z.string().uuid(),
    })

    const data = createUserRotationRequestBody.parse(req.body)

    const createUserRotationUseCase = new CreateUserRotationUseCase()

    const userRotation = await createUserRotationUseCase.execute(data)

    return res.status(201).send(userRotation)
  }
}