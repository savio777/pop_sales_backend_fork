import { BadRequestError } from "@/error/badRequest.error";
import { CompanyRepository } from "@/repository/companyRepository";
import { TaskRepository } from "@/repository/taskRepository";
import { UserRepository } from "@/repository/userRepository";

interface CreateTaskSchema {
  title: string, 
  description?: string, 
  rotationId: string, 
  companyId: string, 
  userAssignedId: string, 
  userCreatedId: string
}

export class CreateTaskUseCase {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly companyRepository: CompanyRepository,
    private readonly userRepository: UserRepository
  ){}

  async execute(
    {companyId, rotationId, title, userAssignedId, userCreatedId, description}:CreateTaskSchema
  ){
    const company = await this.companyRepository.getById(companyId)
    if(!company){
      throw new BadRequestError("company does not exist")
    }
    
    const userCreated = await this.userRepository.getById(userCreatedId)
    if(!userCreated){
      throw new BadRequestError("user created does not exist")
    }

    const userAssigned = await this.userRepository.getById(userAssignedId)
    if(!userAssigned){
      throw new BadRequestError('user assigned does not exist')
    }

    const task = await this.taskRepository.create({
      title,
      description,
      rotation: {connect: {id: rotationId}},
      company: {connect: {id: companyId}},
      assignedTo: {connect: {id: userAssignedId}},
      createdBy: {connect: {id: userCreatedId}}
    })

    return {task}
  }
}