import { listClientServiceResponse } from "@/repository/clientRepository";
import {
  UserCompany,
  Company,
  User,
  Client,
  Rotation,
  UserRotation,
  Stop,
  Task,
} from "@prisma/client";
import { randomUUID } from "crypto";

export const mockCompany: Company = {
  id: randomUUID(),
  name: "Pop sales ltda",
  updatedAt: new Date(),
  createdAt: new Date(),
  status: "ACTIVE",
};

export const mockUser: User = {
  id: randomUUID(),
  createdAt: new Date(),
  updatedAt: new Date(),
  name: "John Doe",
  phone: "123456789",
  email: "johndoe@email.com",
  password: "123456",
  status: "ACTIVE",
};

export const mockUserCompany: UserCompany = {
  id: randomUUID(),
  userId: mockUser.id,
  companyId: mockCompany.id,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const mockClient: Client = {
  id: randomUUID(),
  createdAt: new Date(),
  updatedAt: new Date(),
  name: "salmo 91",
  address: "Rua dos bobos",
  email: "jhondue@email.com",
  companyId: mockCompany.id,
  phoneNumber: "123456789",
  zipCode: "12345678",
  lat: "123456789",
  lon: "123456789",
  responsiblePerson: "John Doe",
};

export const mockClientService: listClientServiceResponse = {
  client: mockClient,
  createdAt: new Date(),
  finalizedAt: null,
};

export const mockRotation: Rotation = {
  id: randomUUID(),
  createdAt: new Date(),
  updatedAt: new Date(),
  companyId: mockClient.id,
  description: "descrição para rotação teste",
};

export const mockUserRotation: UserRotation = {
  id: randomUUID(),
  createdAt: new Date(),
  updatedAt: new Date(),
  userId: mockUser.id,
  rotationId: mockRotation.id,
};

export const mockStop: Stop = {
  id: randomUUID(),
  createdAt: new Date(),
  updatedAt: new Date(),
  clientId: mockClient.id,
  finalizedAt: new Date(),
  status: "COMPLETED",
  sequence: 1,
  rotationId: mockRotation.id,
};

export const mockTask: Task = {
  id: randomUUID(),
  createdAt: new Date(),
  updatedAt: new Date(),
  description: "descrição para tarefa teste",
  status: "COMPLETED",
  stopId: mockStop.id,
  finishedAt: new Date(),
  title: "tarefa teste",
};
