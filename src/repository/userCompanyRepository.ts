import { $Enums, UserCompany } from "@prisma/client"

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
  getByUserIdAndCompanyId({companyId, userId}:{userId: string, companyId: string}): Promise<UserCompany | null>

}