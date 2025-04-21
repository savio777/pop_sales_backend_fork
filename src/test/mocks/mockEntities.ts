import { UserCompany, Company, User } from "@prisma/client";

export const mockCompany: Company = {
  id: "8702afd1-1928-42bb-be35-40fc524c2c85",
  name: "Pop sales ltda",
  updatedAt: new Date(),
  createdAt: new Date(),
  status: "ACTIVE",
}

export const mockUser: User = {
  id: "8702afd1-1928-42bb-be35-40fc524c2c85",
  createdAt: new Date(),
  updatedAt: new Date(),
  name: "John Doe",
  phone: "123456789",
  email: "johndoe@email.com",
  password: "123456",
  status: "ACTIVE"
}

export const mockUserCompany: UserCompany = {
  id: "8702afd1-1928-42bb-be35-40fc524c2c85",
  userId: "8702afd1-1928-42bb-be35-40fc524c2c85",
  companyId: "8702afd1-1928-42bb-be35-40fc524c2c85",
  createdAt: new Date(),
  updatedAt: new Date(),
}