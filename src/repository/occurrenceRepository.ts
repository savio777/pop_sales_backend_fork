import { Occurrence, Prisma } from "@prisma/client";

export interface OccurrenceRepository {
  create(occurrence: Prisma.OccurrenceCreateInput): Promise<Occurrence>;
  getById(id: string): Promise<Occurrence | null>;
  listByCompany({
    companyId,
    periodEnd,
    periodStart,
  }: {
    companyId: string;
    periodStart: Date;
    periodEnd: Date;
  }): Promise<Occurrence[]>;
}
