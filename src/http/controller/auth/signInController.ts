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
      throw new UnauthorizedError("E-mail ou senha estão incorretas")
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

    res.setCookie('token', token, {
      path: '/',
      httpOnly: true,    // O cookie será inacessível ao JavaScript
      secure: false,     // Coloque `true` apenas se você estiver usando HTTPS
      sameSite: 'none',  // Necessário para permitir que o cookie seja enviado entre domínios diferentes
    });
    
    return res.status(200).send({user: userWithOutPassword, token})
  }
}