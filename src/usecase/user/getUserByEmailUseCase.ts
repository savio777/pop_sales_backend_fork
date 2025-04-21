import { NotFoundError } from "@/error/notfound.error";
import { UserRepository } from "@/repository/userRepository";

export class GetUserByEmailUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(email: string) {
    const user = await this.userRepository.getByEmail(email);

    if (!user) {
      throw new NotFoundError("Usuário não encontrado.");
    }

    return { user };
  }
}
