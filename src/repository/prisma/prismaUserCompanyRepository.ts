import { db } from "@/lib/prisma";
import { UserCompanyRepository } from "../userCompanyRepository";
import { $Enums, UserCompany } from "@prisma/client";

interface ListUserCompany {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  user: {
      id: string;
      name: string;
      phone: string | null;
      email: string;
      status: $Enums.StatusUser;
  };
  company: {
      id: string;
      name: string;
      status: $Enums.StatusCompany;
      ownerId: string;
  };
}[]


export class PrismaUserCompanyRepository implements UserCompanyRepository {
  async list(
    { companyId, limit, page }:
    { companyId: string; page: number; limit: number; }
  ): Promise<ListUserCompany[]> {
    const userCompanies = await db.userCompany.findMany({
      where: {
        companyId
      },
      take: limit,
      skip: (page - 1) * limit,
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            status: true
          }
        },
        company: {
          select: {
            id: true,
            name: true,
            status: true,
            ownerId: true
          }
        }
      }
    })
    return userCompanies
  }
  
  async getByUserIdAndCompanyId(
    { userId, companyId }:
    { userId: string; companyId: string; }
  ): Promise<UserCompany | null> {
   const userCompany = await db.userCompany.findFirst({
    where: {
      AND: {
        userId,
        companyId
      }
    }
   })
   return userCompany
  }
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