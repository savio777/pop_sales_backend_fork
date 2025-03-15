import { Prisma, User } from "@prisma/client";
import { UserRepository } from "../userRepository";
import { randomUUID } from "crypto";

export class InMemoryUserRepository implements UserRepository {
  private user: User[] = []

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const newUser: User = {
      id: randomUUID(), 
      name: data.name,
      phone: data.phone || null,
      email: data.email,
      password: data.password,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: data.status || 'ACTIVE', 
    };

    this.user.push(newUser)

    return newUser
  }

  async getById(id: string): Promise<User | null> {
    const user = this.user.find(u => u.id === id)
    return user || null
  }

  async getByEmail(email: string): Promise<User | null> {
    const user = this.user.find(u => u.email === email)
    return user || null
  }

  async update({ id, data }: { id: string; data: Prisma.UserUpdateInput; }): Promise<User | null> {
    const index = this.user.findIndex(u => u.id === id);
    if (index === -1) {
      return null;
    }
  
    const getValue = (field: any) => {
      return field && field.set ? field.set : field;
    };
  
    const updatedUser: User = {
      id: this.user[index].id,
      name: getValue(data.name),
      phone: getValue(data.phone),
      email: getValue(data.email),
      password: getValue(data.password),
      createdAt: this.user[index].createdAt,
      updatedAt: new Date(),
      status: getValue(data.status),
    };

    this.user[index] = updatedUser;
  
    return updatedUser;
  }
  
  async delete(id: string): Promise<void> {
    const index = this.user.findIndex(u => u.id === id);
    if(index === -1){
      throw new Error('User not found');
    }

    this.user.splice(index, 1);
  }
}