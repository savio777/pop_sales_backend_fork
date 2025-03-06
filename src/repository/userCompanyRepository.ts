export interface UserCompanyRepository {
  add(
    {userId, companyId}:
    {userId: string, companyId: string}
  ): Promise<void>
  remove(
    {userId, companyId}:
    {userId: string, companyId: string}
  ): Promise<void>
}