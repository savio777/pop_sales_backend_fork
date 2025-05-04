import { PrismaClientRepository } from "@/repository/prisma/prismaClientRepository";
import { PrismaCompanyRepository } from "@/repository/prisma/prismaCompanyRepository";
import { CreateClientUseCase } from "@/usecase/client/createClientUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export class CreateClientController {
  async handle(req: FastifyRequest, res: FastifyReply) {

    const createClientRequestBody = z.object({
      name: z.string().min(1, "Nome é obrigatório"),
      companyId: z.string().uuid("ID da empresa inválido"),
      email: z.string().email("E-mail inválido"),
      lat: z.string().optional(),
      lon: z.string().optional(),
      address: z.string().optional(),
      phoneNumber: z.string().optional(),
      responsiblePerson: z.string().optional(),
      zipCode: z.string().optional()
    })

    const { companyId, email, name, address, lat, lon, phoneNumber, responsiblePerson, zipCode } = createClientRequestBody.parse(req.body)

    const companyRepository = new PrismaCompanyRepository()
    const clientRepository = new PrismaClientRepository()

    const createClientUseCase = new CreateClientUseCase(
      clientRepository,
      companyRepository,
    )

    const client = await createClientUseCase.execute({
      name,
      companyId,
      email: email ?? null,
      lat: lat ?? null,
      lon: lon ?? null,
      address: address ?? null,
      phoneNumber: phoneNumber ?? null,
      responsiblePerson: responsiblePerson ?? null,
      zipCode: zipCode ?? null,
    })

    return res.status(201).send(client)
  }
}