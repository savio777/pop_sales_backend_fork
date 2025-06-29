import { Prisma, User } from "@prisma/client";
import { UserRepository } from "../userRepository";
import { db } from "@/lib/prisma";

export class PrismaUserRepository implements UserRepository {
  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = await db.user.create({
      data
    })
    return user
  }
  async getById(id: string): Promise<User | null> {
   const user = await db.user.findUnique({
    where: {
      id
    }
   })
   return user
  }
  async getByEmail(email: string): Promise<User | null> {
    const user = await db.user.findUnique({
      where: {
        email
      }
    })
    return user
  }
  async update({ id, data }: { id: string; data: Prisma.UserUpdateInput; }): Promise<User | null> {
    const user = await db.user.update({
      where: {id},
      data
    })
    return user
  }
  async delete(id: string): Promise<void> {
    await db.user.delete({
      where: {id}
    })
  }
}