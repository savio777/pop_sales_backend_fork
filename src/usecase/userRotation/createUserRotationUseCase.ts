import { NotFoundError } from "@/error/notfound.error";
import { RotationRepository } from "@/repository/rotationRepository";
import { UserRepository } from "@/repository/userRepository";
import { UserRotationRepository } from "@/repository/userRotationRepository";

export class CreateUserRotationUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly rotationRepository: RotationRepository,
    private readonly userRotationRepository: UserRotationRepository
  ) {}

  async execute({
    rotationId,
    userId,
  }: {
    userId: string;
    rotationId: string;
  }) {
    const user = await this.userRepository.getById(userId);
    if (!user) {
      throw new NotFoundError("Usuário não encontrado");
    }

    const rotation = await this.rotationRepository.getById(rotationId);
    if (!rotation) {
      throw new NotFoundError("Rota não encontrada");
    }

    const userRotation = await this.userRotationRepository.create({
      User: { connect: { id: userId } },
      Rotation: { connect: { id: rotationId } },
    });

    return { userRotation };
  }
}
