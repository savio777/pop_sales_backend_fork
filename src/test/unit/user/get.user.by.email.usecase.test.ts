import { PrismaUserRepository } from "../../../repository/prisma/prismaUserRepository";
import { beforeEach, describe, expect, it } from "vitest";
import { GetUserByEmailUseCase } from "@/usecase/user/getUserByEmailUseCase";
import { execSync } from "child_process";
import { db } from "@/lib/prisma";

describe("Get user by email", () => {
  let sut: GetUserByEmailUseCase;
  let userRepository: PrismaUserRepository;


  beforeEach(async () => {
    userRepository = new PrismaUserRepository();
    sut = new GetUserByEmailUseCase(userRepository);

    execSync('npx prisma migrate reset --force', { stdio: 'inherit' });
    execSync('npx prisma migrate deploy', { stdio: 'inherit' });  
    execSync('npx prisma db seed', { stdio: 'inherit' });  
  });



  it("should be able get user with email", async () => {
    const email = "teste@email.com";
    const name = "test";
    const password = "test";
    const phone = "99999999";

    await db.user.create({
      data: {
        email, name, password, phone
      }
    })

    const user = await sut.execute(email)

    expect(user).toMatchObject({
      user: {
        id: expect.any(String),
        email,
        name,
        phone,
      },
    });
  });

});
