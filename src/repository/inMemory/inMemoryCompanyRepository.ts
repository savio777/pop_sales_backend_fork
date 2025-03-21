import { Prisma, Company } from "@prisma/client";
import { CompanyRepository } from "../companyRepository";
import { randomUUID } from "crypto";

export class InMemoryCompanyRepository implements CompanyRepository {
  private company: Company[] = [];

  async create(data: Prisma.CompanyCreateInput): Promise<Company> {
    const company: Company = {
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      name: data.name,
      status: data.status ?? "ACTIVE",
    };
    this.company.push(company);

    return company;
  }

  async getById(id: string): Promise<Company | null> {
    const company = this.company.find((i) => i.id === id);
    return company || null;
  }
  
  async findByName(name: string): Promise<Company | null> {
    const company = this.company.find((i) => i.name === name);
    return company || null;
  }

  async update({
    id,
    data,
  }: {
    id: string;
    data: Prisma.CompanyUpdateInput;
  }): Promise<Company | null> {
    const index = this.company.findIndex((i) => i.id === id);
    if (index === -1) {
      return null;
    }

    const updatedCompany: Company = {
      ...this.company[index],
      name:
        typeof data.name === "string" ? data.name : this.company[index].name,
      status:
        typeof data.status === "string"
          ? data.status
          : this.company[index].status,
      updatedAt: new Date(),
    };

    this.company[index] = updatedCompany;
    return updatedCompany;
  }

  async delete(id: string): Promise<void> {
    const index = this.company.findIndex((i) => i.id === id);

    if (index === -1) {
      throw new Error("User not found");
    }

    this.company.splice(index, 1);
  }

  async list({
    userId,
    limit,
    page,
  }: {
    userId: string;
    page: number;
    limit: number;
  }): Promise<Company[]> {
    throw new Error("Method not implemented.");
  }
}
