import { NotFoundError } from "@/error/notfound.error";
import { UserRepository } from "@/repository/userRepository";

interface UpdateUserInputs {
  name?: string;
  phone?: string;
  email?: string;
  status?: "ACTIVE" | "INACTIVE";
}

export class UpdateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ userId, data }: { userId: string; data: UpdateUserInputs }) {
    const userExists = await this.userRepository.getById(userId);
    if (!userExists) {
      throw new NotFoundError("Usuário não encontrado.");
    }

    const user = await this.userRepository.update({
      id: userId,
      data,
    });

    const { password, ...userWithoutPassword } = user!;
    return { user: userWithoutPassword };
  }
}
