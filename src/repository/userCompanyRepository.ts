import { UserCompany } from "@prisma/client"

export interface UserCompanyRepository {
  create(
    {userId, companyId}:
    {userId: string, companyId: string}
  ): Promise<UserCompany>
  remove(id: string): Promise<void>
  getById(id: string): Promise<UserCompany | null>
}