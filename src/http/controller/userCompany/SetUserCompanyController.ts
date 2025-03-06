import { PrismaCompanyRepository } from "@/repository/prisma/prismaCompanyRepository";
import { PrismaUserCompanyRepository } from "@/repository/prisma/prismaUserCompanyRepository";
import { PrismaUserRepository } from "@/repository/prisma/prismaUserRepository";
import { CreateUserCompanyUseCase } from "@/usecase/userCompany/createUserCompanyUseCase";
import { RemoveUserCompanyUseCase } from "@/usecase/userCompany/removeUserCompanyUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export class SetUserCompanyController {
  async handle(req: FastifyRequest, res: FastifyReply){
    const setUserCompanyParams = z.object({
      method: z.enum(["ADD", "REMOVE"])
    })

    const {method} = setUserCompanyParams.parse(req.params)
    const userCompanyRepository = new PrismaUserCompanyRepository()
    
    if(method === "ADD"){
      const setUserCompanyBody = z.object({
        userId: z.string().uuid(),
        companyId: z.string().uuid()
      })

      const {userId, companyId} = setUserCompanyBody.parse(req.body)

      const companyRepository = new PrismaCompanyRepository()
      const userRepository = new PrismaUserRepository()

      const createUserCompanyUseCase = new CreateUserCompanyUseCase(
        userCompanyRepository,
        companyRepository,
        userRepository
      )

      const userCompany = await createUserCompanyUseCase.execute({
        userId, companyId
      })
      return res.status(200).send(userCompany)
    }

    if(method === "REMOVE"){
      const setUserCompanyBody = z.object({
        userCompanyId: z.string().uuid()
      })

      const {userCompanyId} = setUserCompanyBody.parse(req.body)

      const removeUserCompanyUseCase = new RemoveUserCompanyUseCase(
        userCompanyRepository
      )

      await removeUserCompanyUseCase.execute(userCompanyId)
      return res.status(200).send()
    }
  }
}