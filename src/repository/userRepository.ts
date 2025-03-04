import { Prisma, User } from "@prisma/client";

export interface UserRepository {
  create(data: Prisma.UserCreateInput): Promise<User>
  getById(id: string): Promise<User | null>
  getByEmail(email: string): Promise<User | null>
  update({id, data}:{id: string, data: Prisma.UserUpdateInput}): Promise<User | null>
  delete(id: string): Promise<void>
}