import { randomUUID } from "crypto";
import { PrismaCompanyRepository } from "../../../repository/prisma/prismaCompanyRepository";
import { PrismaUserCompanyRepository } from "../../../repository/prisma/prismaUserCompanyRepository";
import { PrismaUserRepository } from "../../../repository/prisma/prismaUserRepository";
import { CreateUserUseCase } from "../../../usecase/user/createUserUseCase";
import { beforeEach, describe, expect, it } from "vitest";
import { BadRequestError } from "@/error/badRequest.error";
import { ConflictError } from "@/error/conflict.error";
import { execSync } from 'child_process';
import { db } from "@/lib/prisma";

describe("Create user use case", () => {
  let sut: CreateUserUseCase;
  let userRepository: PrismaUserRepository;
  let companyRepository: PrismaCompanyRepository;
  let userCompanyRepository: PrismaUserCompanyRepository;

  beforeEach(async () => {
    userRepository = new PrismaUserRepository();
    companyRepository = new PrismaCompanyRepository();
    userCompanyRepository = new PrismaUserCompanyRepository();

    sut = new CreateUserUseCase(
      userRepository,
      companyRepository,
      userCompanyRepository
    );

    execSync('npx prisma migrate reset --force', { stdio: 'inherit' });
    execSync('npx prisma migrate deploy', { stdio: 'inherit' });  
    execSync('npx prisma db seed', { stdio: 'inherit' });  
  });

  it("should be able to create a new user", async () => {
    const userOwner = await db.user.create({
      data: {
        name: "teste",
        email: "teste@gmail.com",
        password: "12345",
      },
    });

    const company = await db.company.create({
      data: {
        name: "Company Test",
        owner: { connect: { id: userOwner.id } },
      },
    });

    const email = "teste@email.com";
    const name = "test";
    const password = "test";
    const phone = "99999999";

    const result = await sut.execute({
      companyId: company.id,
      email,
      name,
      password,
      phone,
    });

    expect(result).toMatchObject({
      user: {
        id: expect.any(String),
        email,
        name,
        phone
      },
    });
  });

  it("should not be able to create a new user if company does not exist", async () => {
    const email = "teste@email.com";
    const name = "test";
    const password = "test";
    const phone = "99999999";
  
    const companyIdNotExist = randomUUID();
  
    await expect(
      sut.execute({
        companyId: companyIdNotExist,
        email,
        name,
        password,
        phone,
      })
    ).rejects.toThrowError(BadRequestError);
  });

  it("should not be able to create a new user with email already exist", async () => {
    const userOwner = await db.user.create({
      data: {
        name: "teste",
        email: "teste@gmail.com",
        password: "12345",
      },
    });

    const company = await db.company.create({
      data: {
        name: "Company Test",
        owner: { connect: { id: userOwner.id } },
      },
    });

    const email = "teste@email.com";
    const name = "test";
    const password = "test";
    const phone = "99999999";

    await sut.execute({
      companyId: company.id,
      email,
      name,
      password,
      phone,
    });

    await expect(
      sut.execute({
        companyId: company.id,
        email,
        name,
        password,
        phone,
      })
    ).rejects.toThrowError(ConflictError);
  });
});
