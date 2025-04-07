import { Prisma, ServiceAssessment } from "@prisma/client";
import { ServiceAssessmentRepository } from "../serviceAssessmentRepository";
import { db } from "@/lib/prisma";

export class PrismaServiceAssessmentRepository implements ServiceAssessmentRepository {
  async listById(id: string): Promise<ServiceAssessment | null> {
    const assessment = await db.serviceAssessment.findUnique({
      where: {
        id
      }
    });
    return assessment;
  }
  async create(data: Prisma.ServiceAssessmentCreateInput): Promise<ServiceAssessment> {
    const assessment = await db.serviceAssessment.create({
      data
    });
    return assessment;
  }

  async listByCompany(companyId: string): Promise<ServiceAssessment[]> {
    const assessments = await db.serviceAssessment.findMany({
      where: {
        Company: {
          id: companyId
        }
      },
    });
    return assessments;
  }

  async listByUser(userId: string): Promise<ServiceAssessment[]> {
    const assessments = await db.serviceAssessment.findMany({
      where: {
        userId
      },
    });
    return assessments;
  }

  async listByClient(clientId: string): Promise<ServiceAssessment[]> {
    const assessments = await db.serviceAssessment.findMany({
      where: {
        clientId
      },
    });
    return assessments;
  }
}