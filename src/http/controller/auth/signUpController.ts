import { PrismaCompanyRepository } from "@/repository/prisma/prismaCompanyRepository";
import { PrismaUserCompanyRepository } from "@/repository/prisma/prismaUserCompanyRepository";
import { PrismaUserRepository } from "@/repository/prisma/prismaUserRepository";
import { PrismaUserPermissionRepository } from "@/repository/prisma/prismaUserPermissionRepository";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import bcrypt from "bcrypt";
import { CreateUserUseCase } from "@/usecase/user/createUserUseCase";

export class SignUpController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const signUpSchema = z.object({
      name: z.string().min(5, "name is very small").max(50, "name is very big"),
      email: z.string().email(),
      password: z
        .string()
        .min(4, "password is very small")
        .max(20, "password is very big"),
      phone: z
        .string()
        .min(8, "phone number is very small")
        .max(20, "phone number is very big")
        .optional(),
      companyId: z.string().uuid(),
      type: z.enum(["MANAGER", "EMPLOYEE"]).default("EMPLOYEE"),
      status: z.enum(["ACTIVE", "INACTIVE"]).default("ACTIVE"),
    });

    const data = signUpSchema.parse(req.body);

    const userRepository = new PrismaUserRepository();
    const companyRepository = new PrismaCompanyRepository();
    const userCompanyRepository = new PrismaUserCompanyRepository();
    const userPermissionRepository = new PrismaUserPermissionRepository();
    // add repository permission

    const signUpUseCase = new CreateUserUseCase(
      userRepository,
      companyRepository,
      userCompanyRepository
    );

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(data.password, saltRounds);

    const result = await signUpUseCase.execute({
      name: data.name,
      email: data.email,
      companyId: data.companyId,
      password: passwordHash,
      phone: data.phone,
      type: data.type,
      status: data.status,
    });

    // Associar permissão ao usuário conforme o tipo
    const permission = await userPermissionRepository.findPermissionByName(
      data.type
    );
    let userPermission = null;
    if (permission) {
      userPermission = await userPermissionRepository.create(
        result.user.id,
        permission.id
      );
    }

    const { password, ...userWithOutPassword } = result.user;

    return res
      .status(201)
      .send({
        user: userWithOutPassword,
        userCompany: result.userCompany,
        userPermission,
      });
  }
}
