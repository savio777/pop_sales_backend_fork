import { BadRequestError } from "@/error/badRequest.error";
import { CompanyRepository } from "@/repository/companyRepository";
import { TaskRepository } from "@/repository/taskRepository";
import { UserRepository } from "@/repository/userRepository";

interface ListTaskRequest {
  limit: number;
  page: number;
  userCreatedId?: string;
  userAssignedId?: string;
  companyId?: string;
  status?: "COMPLETED" | "PENDING";
  createdAt?: Date;
  finishedAt?: Date;
}

export class ListTaskUseCase {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly userRepository: UserRepository,
    private readonly companyRepository: CompanyRepository
  ) {}

  async execute({
    limit,
    page,
    userCreatedId,
    userAssignedId,
    companyId,
    status,
    createdAt,
    finishedAt,
  }: ListTaskRequest) {
    if (companyId && !userCreatedId && !userAssignedId) {
      throw new BadRequestError("Se o filtro 'companyId' for fornecido, 'userCreatedId' ou 'userAssignedId' também devem ser fornecidos.");
    }

    if (companyId) {
      const companyExists = await this.companyRepository.getById(companyId);
      if (!companyExists) {
        throw new BadRequestError("Company ID não encontrado.");
      }
    }

    if (userCreatedId) {
      const userCreatedExists = await this.userRepository.getById(userCreatedId);
      if (!userCreatedExists) {
        throw new BadRequestError("User Created ID não encontrado.");
      }
    }

    if (userAssignedId) {
      const userAssignedExists = await this.userRepository.getById(userAssignedId);
      if (!userAssignedExists) {
        throw new BadRequestError("User Assigned ID não encontrado.");
      }
    }

    const tasks = await this.taskRepository.listTask({
      limit,
      page,
      userCreatedId,
      userAssignedId,
      companyId,
      status,
      createdAt,
      finishedAt,
    });

    return { tasks };
  }
}
