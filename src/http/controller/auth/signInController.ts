import { PrismaUserRepository } from "@/repository/prisma/prismaUserRepository";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"
import { UnauthorizedError } from "@/error/unauthorized.error";
import { GetUserByEmailUseCase } from "@/usecase/user/getUserByEmailUseCase";
import { env } from "@/env";

export class SignInController {
  async handle(req: FastifyRequest, res: FastifyReply){
    const signUpSchema = z.object({
      email: z.string().email(),
      password: z.string()
    })
    const data = signUpSchema.parse(req.body)

    const userRepository = new PrismaUserRepository()
    const getUserByEmailUseCase = new GetUserByEmailUseCase(userRepository)
    const {user} = await getUserByEmailUseCase.execute(data.email)


    const isPasswordCorrect = await bcrypt.compare(data.password, user.password);
    if (!isPasswordCorrect) {
      throw new UnauthorizedError("e-mail or password are not correct")
    }

    const payload = {
      userId: user.id
    }

    const signOptions = {
      expiresIn: 60 * 60 * 24 * 7 // 7 days
    }

    const token = jwt.sign(
      payload,
      env.PRIVATE_KEY, 
      signOptions 
    );

    const {password, ...userWithOutPassword} = user

    return res.status(200).send({user: userWithOutPassword, token})
  }
}