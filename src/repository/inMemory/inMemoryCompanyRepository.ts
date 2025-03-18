import { Prisma, Company } from "@prisma/client";
import { CompanyRepository } from "../companyRepository";
import { randomUUID } from "crypto";

export class InMemoryCompanyRepository implements CompanyRepository {
  private company: Company[] = []

  async create(data: Prisma.CompanyCreateInput): Promise<Company> {
    const company: Company = {
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      name: data.name,
      status: data.status ?? "ACTIVE",
    }
    this.company.push(company)

    return company
  }
  
  async getById(id: string): Promise<Company | null> {
    const company = this.company.find(i => i.id === id)
    return company || null
  }
  async findByName(name: string): Promise<Company | null> {
    const company = this.company.find(i => i.name === name)
    return company || null
  }
  update({ id, data }: { id: string; data: Prisma.CompanyUpdateInput; }): Promise<Company | null> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  list({ userId, limit, page }: { userId: string; page: number; limit: number; }): Promise<Company[]> {
    throw new Error("Method not implemented.");
  }
  
}