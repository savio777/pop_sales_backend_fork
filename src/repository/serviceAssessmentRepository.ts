import { Prisma, ServiceAssessment } from "@prisma/client";

export interface ServiceAssessmentRepository {
  create(data: Prisma.ServiceAssessmentCreateInput): Promise<ServiceAssessment>
  listByCompany(companyId: string): Promise<ServiceAssessment[]>
  listByUser(userId: string): Promise<ServiceAssessment[]>
  listByClient(clientId: string): Promise<ServiceAssessment[]>
  getById(id: string): Promise<ServiceAssessment | null>
}