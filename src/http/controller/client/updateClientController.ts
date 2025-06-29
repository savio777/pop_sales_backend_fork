import { PrismaClientRepository } from "@/repository/prisma/prismaClientRepository";
import { UpdateClientUseCase } from "@/usecase/client/updateClientUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export class UpdateClientController {
  async handle(req: FastifyRequest, res: FastifyReply) {

    const updateClientRequestBody = z.object({
      name: z.string().min(1, "Nome é obrigatório").optional(),
      companyId: z.string().uuid("ID da empresa inválido").optional(),
      email: z.string().email("E-mail inválido").optional(),
      lat: z.string().optional(),
      lon: z.string().optional(),
      address: z.string().optional(),
      phoneNumber: z.string().optional(),
      responsiblePerson: z.string().optional(),
      zipCode: z.string().optional()
    })

    const updateClientParams = z.object({
      id: z.string().uuid("ID do cliente inválido")
    })

    const { id } = updateClientParams.parse(req.params)

    const data = updateClientRequestBody.parse(req.body)

    const clientRepository = new PrismaClientRepository()

    const updateClientUseCase = new UpdateClientUseCase(
      clientRepository,
    )

    const client = await updateClientUseCase.execute(id, data)

    return res.status(202).send(client)
  }
}