import { randomUUID } from "crypto";
import { db } from "../../../lib/prisma";
import { PrismaCompanyRepository } from "../../../repository/prisma/prismaCompanyRepository";
import { PrismaUserCompanyRepository } from "../../../repository/prisma/prismaUserCompanyRepository";
import { PrismaUserRepository } from "../../../repository/prisma/prismaUserRepository";
import { CreateUserUseCase } from "../../../usecase/user/createUserUseCase";
import { beforeEach, describe, expect, it } from "vitest";
import { BadRequestError } from "@/error/badRequest.error";
import { ConflictError } from "@/error/conflict.error";

describe("Create user use case", () => {
  let sut: CreateUserUseCase;
  let userRepository: PrismaUserRepository;
  let companyRepository: PrismaCompanyRepository;
  let userCompanyRepository: PrismaUserCompanyRepository;

beforeEach(async () => {
  await db.$transaction([
    db.userCompany.deleteMany(),
    db.company.deleteMany(),
    db.user.deleteMany(),
  ]);

  userRepository = new PrismaUserRepository();
  companyRepository = new PrismaCompanyRepository();
  userCompanyRepository = new PrismaUserCompanyRepository();

  sut = new CreateUserUseCase(
    userRepository,
    companyRepository,
    userCompanyRepository
  );
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

    const email = "teste@email.com"
    const name = "test"
    const password = "test"
    const phone = "99999999"

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

    const email = "teste@email.com"
    const name = "test"
    const password = "test"
    const phone = "99999999"

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
    ).rejects.toThrowError(ConflictError)
  })
  
});
