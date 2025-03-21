import { UserCompany } from "@prisma/client";
import { UserCompanyRepository } from "../userCompanyRepository";
import { randomUUID } from "crypto";

export class InMemoryUserCompanyRepository implements UserCompanyRepository{
  
  private userCompany: UserCompany[] = []
  
  async list(
    { companyId, limit, page }:
    { companyId: string; limit: number; page: number; }
  ): Promise<UserCompany[]> {
    const userCompanies = this.userCompany.filter(i => i.companyId === companyId);

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    return userCompanies.slice(startIndex, endIndex);
  }
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
  async remove(id: string): Promise<void> {
    const index = this.userCompany.findIndex((i) => i.id === id);
    if (index === -1) {
      throw new Error("User not found");
    }
    this.userCompany.splice(index, 1);
  }
  async getByUserIdAndCompanyId({ userId, companyId }: { userId: string; companyId: string; }): Promise<UserCompany | null> {
    const userCompany = this.userCompany.find(i => i.companyId === companyId && i.userId === userId)
    if(!userCompany){
      return null
    }
    return userCompany
  }
  async getById(id: string): Promise<UserCompany | null> {
    const userCompany = this.userCompany.find(i => i.id === id)
    if(!userCompany){
      return null
    }
    return userCompany
  }


}