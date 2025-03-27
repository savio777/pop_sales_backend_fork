import { PrismaClientRepository } from "@/repository/prisma/prismaClientRepository";
import { PrismaCompanyRepository } from "@/repository/prisma/prismaCompanyRepository";
import { CreateClientUseCase } from "@/usecase/client/createClientUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export class CreateClientController {
  async handle(req: FastifyRequest, res: FastifyReply){

    const createCompanyRequestBody = z.object({
      name: z.string(), 
      companyId: z.string().uuid(), 
      email: z.string().email(), 
      lat: z.string().optional(), 
      lon: z.string().optional(), 
      address: z.string().optional(), 
      phoneNumber: z.string().optional(), 
      responsiblePerson: z.string().optional(), 
      zipCode: z.string().optional()
    })

    const data = createCompanyRequestBody.parse(req.body)

    const companyRepository = new PrismaCompanyRepository()
    const clientRepository = new PrismaClientRepository()

    const createClientUseCase = new CreateClientUseCase(
      clientRepository,
      companyRepository,
    )

    const client = await createClientUseCase.execute(data)

    return res.status(201).send(client)
  }
}