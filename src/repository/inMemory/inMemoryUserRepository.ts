import { Prisma, User } from "@prisma/client";
import { UserRepository } from "../userRepository";
import { randomUUID } from "crypto";

export class InMemoryUserRepository implements UserRepository {
  private user: User[] = []

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user: User = {
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      name: data.name,
      phone: data.phone ?? null, 
      email: data.email,
      password: data.password,
      status: data.status ?? 'ACTIVE',
    };
  
    this.user.push(user);
    return user;
  }
  
  
  getById(id: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }
  
  async getByEmail(email: string): Promise<User | null> {
    const user = this.user.find( i => i.email === email)
    return user || null
  }
  update({ id, data }: { id: string; data: Prisma.UserUpdateInput; }): Promise<User | null> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  
}