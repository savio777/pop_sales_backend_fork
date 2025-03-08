import { BadRequestError } from "@/error/badRequest.error";
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

    if(!user){
      throw new Error("não foi possivel atualizar os dados do usuário")
    }
  
    const { password, ...userWithoutPassword } = user!
    return {user: userWithoutPassword}

  }
}