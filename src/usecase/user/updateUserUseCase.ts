import { UserRepository } from "@/repository/userRepository";

interface UpdateUserInputs {
  name?: string
  phone?: string
  email?: string
  password?: string
}

export class UpdateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository
  ){}

  async execute(
    {userId, data}:
    {userId: string, data:UpdateUserInputs}
  ){
    const user = await this.userRepository.update({
      id: userId, data
    })

    return {user}
  }
}