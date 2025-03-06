import { Company, Prisma } from "@prisma/client"

export interface CompanyRepository {
  create(
   data: Prisma.CompanyCreateInput
  ): Promise<Company>
  getById(id: string): Promise<Company | null>
  findByName(name: string): Promise<Company | null>
  update({id, data}:{id: string, data: Prisma.CompanyUpdateInput}): Promise<Company | null>
  delete(id: string): Promise<void>
}