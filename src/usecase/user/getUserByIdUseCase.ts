import { NotFoundError } from "@/error/notfound.error";
import { UserRepository } from "@/repository/userRepository";

export class GetUserByIdUseCase {
  constructor(
    private readonly userRepository: UserRepository
  ){}

  async execute(userId: string){
    const user = await this.userRepository.getById(userId)
    if(!user){
      throw new NotFoundError("user not found")
    }
    return {user}
  }
}