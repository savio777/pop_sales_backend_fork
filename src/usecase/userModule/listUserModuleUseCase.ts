import { UserModuleRepository } from "@/repository/userModuleRepository";

export class ListUseModuleUseCase {
  constructor(
    private readonly userModuleRepository: UserModuleRepository
  ){}

  async execute(
    {userId, limit, page}:
    {userId: string, page: number, limit: number}
  ){
    const userModules = await this.userModuleRepository.list({
      userId, limit, page
    })
    return {userModules}
  }
}