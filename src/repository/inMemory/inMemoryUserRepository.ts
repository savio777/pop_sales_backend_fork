import { Prisma, User } from "@prisma/client";
import { UserRepository } from "../userRepository";
import { randomUUID } from "crypto";

export class InMemoryUserRepository implements UserRepository {
  private user: User[] = [];

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user: User = {
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      name: data.name,
      phone: data.phone ?? null,
      email: data.email,
      password: data.password,
      status: data.status ?? "ACTIVE",
    };

    this.user.push(user);
    return user;
  }

  async getById(id: string): Promise<User | null> {
    const user = this.user.find((i) => i.id === id);
    return user || null;
  }

  async getByEmail(email: string): Promise<User | null> {
    const user = this.user.find((i) => i.email === email);
    return user || null;
  }

  async update({
    id,
    data,
  }: {
    id: string;
    data: Prisma.UserUpdateInput;
  }): Promise<User | null> {
    const index = this.user.findIndex((i) => i.id === id);
    if (index === -1) {
      return null;
    }
  
    const updatedUser: User = {
      ...this.user[index],
      name: typeof data.name === "string" ? data.name : this.user[index].name,
      phone: typeof data.phone === "string" ? data.phone : this.user[index].phone,
      email: typeof data.email === "string" ? data.email : this.user[index].email,
      password: typeof data.password === "string" ? data.password : this.user[index].password,
      status: typeof data.status === "string" ? data.status : this.user[index].status,
      updatedAt: new Date(),
    };
  
    this.user[index] = updatedUser;
    return updatedUser;
  }
  
  async delete(id: string): Promise<void> {
    const index = this.user.findIndex((i) => i.id === id);
    
    if (index === -1) {
      throw new Error("User not found");
    }
  
    this.user.splice(index, 1);
  }
}
