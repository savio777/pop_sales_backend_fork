import { ClientRepository } from "@/repository/clientRepository";
import { CompanyRepository } from "@/repository/companyRepository";
import { UserCompanyRepository } from "@/repository/userCompanyRepository";
import { UserRepository } from "@/repository/userRepository";
import { jest } from '@jest/globals';

// user mock repository
export const mockUserRepository: jest.Mocked<UserRepository> = {
  getByEmail: jest.fn(),
  create: jest.fn(),
  getById: jest.fn(),
  update: jest.fn(),
  delete: jest.fn()
};

export const mockCompanyRepository: jest.Mocked<CompanyRepository> = {
  getById: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  findByName: jest.fn(),
  list: jest.fn()
};

export const mockUserCompanyRepository: jest.Mocked<UserCompanyRepository> = {
  create: jest.fn(),
  getById: jest.fn(),
  getByUserIdAndCompanyId: jest.fn(),
  list: jest.fn(),
  remove: jest.fn(),
};

// client mock repository
export const mockClientRepository: jest.Mocked<ClientRepository> = {
  create: jest.fn(),
  getByName: jest.fn(),
  getByEmail: jest.fn(),
  getById: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  listClientService: jest.fn(),
}