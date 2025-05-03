import { db } from "@/lib/prisma";
import { PrismaUserRepository } from "@/repository/prisma/prismaUserRepository";
import { GetUserByIdUseCase } from "@/usecase/user/getUserByIdUseCase";
import { FastifyReply, FastifyRequest } from "fastify";

export class GetMyUserController {
  async handle(req: FastifyRequest, res: FastifyReply){
    const userId = req.userAuth!.id

    const userRepository = new PrismaUserRepository()
    const getUserByIdUseCase = new GetUserByIdUseCase(userRepository)

    const {user} = await getUserByIdUseCase.execute(userId)

    const company = await db.userCompany.findFirst({
      where: {
        userId: userId
      },
      select: {
        Company: true,
      }
    })

    if(!company){
      return res.status(400).send("Usuário não possui empresa relacionada")
    }

    const {password, ...userWithOutPassword} = user

    return res.status(200).send({user: userWithOutPassword, company:company.Company})
  }
}