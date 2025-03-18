import { NotFoundError } from "@/error/notfound.error";
import { UserRepository } from "@/repository/userRepository";

interface UpdateUserInputs {
  name?: string
  phone?: string
  email?: string
  status?: "ACTIVE" | "INACTIVE"
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
      throw new NotFoundError("não foi possivel atualizar os dados do usuário")
    }
  
    const { password, ...userWithoutPassword } = user!
    return {user: userWithoutPassword}
  }
}