import { $Enums, UserCompany } from "@prisma/client"

export interface UserCompanyRepository {
  create(
    {userId, companyId}:
    {userId: string, companyId: string}
  ): Promise<UserCompany>
  delete(id: string): Promise<UserCompany>
  getByUserIdAndCompanyId(
    {userId, companyId}:
    {userId: string, companyId: string}
  ): Promise<UserCompany | null>
  getById(id: string): Promise<UserCompany | null>
  getByUserIdAndCompanyId({companyId, userId}:{userId: string, companyId: string}): Promise<UserCompany | null>
  list(
    {companyId, limit, page}:
    {companyId: string, limit: number, page: number}
  ): Promise<UserCompany[]>

}