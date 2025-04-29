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
  CheckinCheckout,
  FormEntry,
  FormTemplate,
  Question,
  Answer,
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

export const mockCheckInCheckOut: CheckinCheckout = {
  id: randomUUID(),
  createdAt: new Date(),
  userId: mockUser.id,
  finalizedAt: new Date(),
  clientId: mockClient.id,
  serviceDuration: 200,
};

export const mockCheckInCheckOutCreate = {
  clientId: mockClient.id,
  userId: mockUser.id,
  stopId: mockStop.id,
  checkInChekcOutId: randomUUID(),
  rotationId: mockRotation.id,
  lat: "-12.312",
  lon: "60.123",
};

export const mockFormTemplate: FormTemplate = {
  id: randomUUID(),
  createdAt: new Date(),
  companyId: mockCompany.id,
  formType: "CLIENT",
};

export const mockFormEntry: FormEntry = {
  id: randomUUID(),
  createdAt: new Date(),
  companyId: mockCompany.id,
  formTemplateId: mockFormTemplate.id,
  taskId: mockTask.id,
  userId: mockUser.id,
};

interface FormResponse {
  question: string;
  answer: string | null;
}

interface FormEntryResponse {
  id: string;
  userId: string | null;
  taskId: string | null;
  // formTemplateId: string;
  companyId: string | null;
  createdAt: Date;
  form: FormResponse[];
}

interface FormEntryWithRelations extends FormEntry {
  formTemplate: FormTemplate & {
    questions: Question[];
  };
  answers: (Answer & {
    question: Question;
  })[];
}

export const mockFormEntryWithRelations: FormEntryWithRelations = {
  id: mockFormEntry.id,
  userId: mockFormEntry.userId,
  taskId: mockFormEntry.taskId,
  companyId: mockFormEntry.companyId,
  createdAt: mockFormEntry.createdAt,
  answers: [
    {
      id: "1234-5678-9012-3456",
      createdAt: new Date(),
      text: "resposta teste",
      imageUrl: null,
      questionId: randomUUID(),
      formEntryId: mockFormEntry.id,
      question: {
        id: "1234-5678-9012-3456",
        formTemplateId: mockFormTemplate.id,
        text: "pergunta teste",
        required: true,
        type: "TEXT",
      },
    }
  ],
  formTemplate: {
    id: mockFormTemplate.id,
    createdAt: mockFormTemplate.createdAt,
    companyId: mockFormTemplate.companyId,
    formType: mockFormTemplate.formType,
    questions: [
      {
        id: "1234-5678-9012-3456",
        formTemplateId: mockFormTemplate.id,
        text: "pergunta teste",
        required: true,
        type: "TEXT",
      }
    ]
  },
  formTemplateId: mockFormTemplate.id,
};

export const mockformEntryResponse: FormEntryResponse = {
  id: randomUUID(),
  userId: mockUser.id ?? null,
  taskId: mockTask.id ?? null,
  // formTemplateId: data.formTemplateId,
  companyId: mockCompany.id ?? null,
  createdAt: mockFormEntry.createdAt,
  form: [
    {
      question: "pergunta teste",
      answer: "resposta teste",
    }
  ],
};