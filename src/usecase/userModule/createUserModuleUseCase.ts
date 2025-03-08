import { BadRequestError } from "@/error/badRequest.error";
import { ModuleRepository } from "@/repository/moduleRepository";
import { UserModuleRepository } from "@/repository/userModuleRepository";
import { UserRepository } from "@/repository/userRepository";

export class CreateUserModuleUseCase {
  constructor(
    private readonly userModuleRepository: UserModuleRepository,
    private readonly userRepository: UserRepository,
    private readonly moduleRepository: ModuleRepository
  ){}

  async execute(
    {userId, moduleId}:
    {userId: string, moduleId: string}
  ){
    const user = await this.userRepository.getById(userId)
    if(!user){
      throw new BadRequestError("user not exist")
    }

    const module = await this.moduleRepository.getById(moduleId)
    if(!module){
      throw new BadRequestError("module not exist")
    }

    const userModule = await this.userModuleRepository.create({userId, moduleId})
    return {userModule}
  }
}