import { Prisma, Company } from "@prisma/client";
import { CompanyRepository } from "../companyRepository";
import { db } from "@/lib/prisma";

export class PrismaCompanyRepository implements CompanyRepository {
  async delete(id: string): Promise<Company> {
    const company = await db.company.delete({
      where: {
        id
      }
    })
    return company
  }
  async list(): Promise<Company[]> {
   const companies = db.company.findMany()
   return companies
  }
  async findByName(name: string): Promise<Company | null> {
    const company = await db.company.findUnique({
      where: {
        name
      }
   })
   return company
  }
  async create(
   data: Prisma.CompanyCreateInput
  ): Promise<Company> {
    const company = await db.company.create({
      data
    })
    return company
  }
  async getById(id: string): Promise<Company | null> {
   const company = await db.company.findUnique({
      where: {
        id
      }
   })
   return company
  }
  async update({ id, data }: { id: string; data: Prisma.CompanyUpdateInput; }): Promise<Company | null> {
    const company = await db.company.update({
      where: {
        id
      },
      data
    })
    return company
  }

}