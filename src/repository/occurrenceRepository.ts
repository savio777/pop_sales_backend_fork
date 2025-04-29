import { Occurrence, Prisma } from "@prisma/client";

export interface OccurrenceRepository {
  create(occurrence: Prisma.OccurrenceCreateInput): Promise<Occurrence>;
  getById(id: string): Promise<Occurrence | null>;
  listByCompany({
    companyId,
    periodEnd,
    periodStart,
    limit,
    page
  }: {
    companyId: string;
    periodStart: Date;
    periodEnd: Date;
    limit: number,
    page: number
  }): Promise<Occurrence[]>;
}
