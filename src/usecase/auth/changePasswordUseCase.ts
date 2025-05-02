import { BadRequestError } from "@/error/badRequest.error";
import { NotFoundError } from "@/error/notfound.error";
import { UnauthorizedError } from "@/error/unauthorized.error";
import { cache } from "@/lib/redis";
import { UserRepository } from "@/repository/userRepository";
import bcrypt from "bcrypt";

interface PayloadCache {
  email: string;
  code: number[];
}

export class ChangePasswordUseCase {
  constructor(
    private readonly userRepository: UserRepository,
  ) { }

  async execute(
    { code, password, confirmPassword, email }
      : {
        password: string,
        confirmPassword: string,
        code: number[],
        email: string
      }
  ) {

    const user = await this.userRepository.getByEmail(email);
    if (!user) {
      throw new NotFoundError("Usuário não encontrado com este email");
    }

    const data = await cache.get("recovery:password:code:" + email) as PayloadCache | null;
    if (!data) {
      throw new NotFoundError("E-mail não encontrado");
    }

    if (!code.every((num, index) => num === data.code[index])) {
      throw new UnauthorizedError("Código de recuperação inválido");
    }

    if (password !== confirmPassword) {
      throw new BadRequestError("As senhas não conferem");
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);


    await this.userRepository.update({
      id: user.id,
      data: {
        password: passwordHash
      }
    });

    await cache.del("recovery:password:code:" + email);

    return {
      message: "Senha alterada com sucesso"
    }
  }
}
