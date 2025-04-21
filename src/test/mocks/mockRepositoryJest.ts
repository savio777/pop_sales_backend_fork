import { ClientRepository } from "@/repository/clientRepository";
import { CompanyRepository } from "@/repository/companyRepository";
import { RotationRepository } from "@/repository/rotationRepository";
import { StopRepository } from "@/repository/stopRepository";
import { TaskRepository } from "@/repository/taskRepository";
import { UserCompanyRepository } from "@/repository/userCompanyRepository";
import { UserRepository } from "@/repository/userRepository";
import { UserRotationRepository } from "@/repository/userRotationRepository";
import { jest } from "@jest/globals";

export const mockUserRepository: jest.Mocked<UserRepository> = {
  getByEmail: jest.fn(),
  create: jest.fn(),
  getById: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

export const mockCompanyRepository: jest.Mocked<CompanyRepository> = {
  getById: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  findByName: jest.fn(),
  list: jest.fn(),
};

export const mockUserCompanyRepository: jest.Mocked<UserCompanyRepository> = {
  create: jest.fn(),
  getById: jest.fn(),
  getByUserIdAndCompanyId: jest.fn(),
  list: jest.fn(),
  delete: jest.fn(),
};

export const mockClientRepository: jest.Mocked<ClientRepository> = {
  create: jest.fn(),
  getByName: jest.fn(),
  getByEmail: jest.fn(),
  getById: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  listClientService: jest.fn(),
};

export const mockRotationRepository: jest.Mocked<RotationRepository> = {
  create: jest.fn(),
  getById: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

export const mockUserRotationRepository: jest.Mocked<UserRotationRepository> = {
  getRotationByUserId: jest.fn(),
  create: jest.fn(),
};

export const mockTaskRepository: jest.Mocked<TaskRepository> = {
  update: jest.fn(),
  create: jest.fn(),
  getById: jest.fn(),
  delete: jest.fn(),
  listByStopId: jest.fn(),
};

export const mockStopRepository: jest.Mocked<StopRepository> = {
  create: jest.fn(),
  getById: jest.fn(),
  getByRotationId: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
}