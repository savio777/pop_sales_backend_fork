import { UserCompany } from "@prisma/client"

export interface UserCompanyRepository {
  create(
    {userId, companyId}:
    {userId: string, companyId: string}
  ): Promise<UserCompany>
  remove(id: string): Promise<void>
  getByUserIdAndCompanyId(
    {userId, companyId}:
    {userId: string, companyId: string}
  ): Promise<UserCompany | null>
  getById(id: string): Promise<UserCompany | null>
  list(
    {companyId, limit, page}:
    {companyId: string, page: number, limit: number}
  ): Promise<UserCompany[]>
}