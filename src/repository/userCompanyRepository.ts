import { $Enums, UserCompany } from "@prisma/client"

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
  ): Promise<ListUserCompany[]>
}