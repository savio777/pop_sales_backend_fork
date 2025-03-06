import { db } from "@/lib/prisma";
import { UserCompanyRepository } from "../userCompanyRepository";
import { UserCompany } from "@prisma/client";

export class PrismaUserCompanyRepository implements UserCompanyRepository {
  async getById(id: string): Promise<UserCompany | null> {
    const userCompany = await db.userCompany.findUnique({
      where: {
        id
      }
    })
    return userCompany
  }
  async create({ userId, companyId }: { userId: string; companyId: string; }): Promise<UserCompany> {
   const userCompany = await db.userCompany.create({
    data: {
      userId,
      companyId
    }
   })
   return userCompany
  }
  async remove(id: string): Promise<void> {
    await db.userCompany.delete({
      where: {
       id
      }
     })
  }
  
}