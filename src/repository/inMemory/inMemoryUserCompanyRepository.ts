import { UserCompany } from "@prisma/client";
import { UserCompanyRepository } from "../userCompanyRepository";
import { randomUUID } from "crypto";

export class InMemoryUserCompanyRepository implements UserCompanyRepository{

  private userCompany: UserCompany[] = []

  async create({ userId, companyId }: { userId: string; companyId: string; }): Promise<UserCompany> {
    const userCompany: UserCompany = {
      companyId,
      userId,
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date()
    }

    this.userCompany.push(userCompany)
    return userCompany
  }
  remove(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getByUserIdAndCompanyId({ userId, companyId }: { userId: string; companyId: string; }): Promise<UserCompany | null> {
    throw new Error("Method not implemented.");
  }
  getById(id: string): Promise<UserCompany | null> {
    throw new Error("Method not implemented.");
  }


}