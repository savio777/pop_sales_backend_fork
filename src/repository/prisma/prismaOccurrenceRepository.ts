import { Prisma, Occurrence } from "@prisma/client";
import { OccurrenceRepository } from "../occurrenceRepository";
import { db } from "@/lib/prisma";

export class PrismaOccurrenceRepository implements OccurrenceRepository {
  async create(occurrence: Prisma.OccurrenceCreateInput): Promise<Occurrence> {
    return await db.occurrence.create({
      data: occurrence,
    });
  }
  async getById(id: string): Promise<Occurrence | null> {
    return await db.occurrence.findUnique({
      where: {
        id,
      },
    });
  }
  async listByCompany({
    companyId,
    periodEnd,
    periodStart,
    limit,
    page,
  }: {
    companyId: string;
    periodStart: Date;
    periodEnd: Date;
    limit: number;
    page: number;
  }): Promise<Occurrence[]> {
    const offset = (page - 1) * limit;

    return await db.occurrence.findMany({
      where: {
        companyId,
        createdAt: {
          gte: periodStart,
          lte: periodEnd,
        },
      },
      skip: offset,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    });
  }
}
