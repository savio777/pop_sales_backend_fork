import { Prisma, User } from "@prisma/client";

export interface UserRepository {
  create(data: Prisma.UserCreateInput): Promise<User>
  getById(id: String): Promise<User | null>
  getByEmail(email: String): Promise<User | null>
  update({id, data}:{id: string, data: Prisma.UserUpdateInput}): Promise<User | null>
  delete(id: String): Promise<void>
}