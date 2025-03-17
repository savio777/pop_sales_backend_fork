import { db } from "../../../lib/prisma";
import { PrismaCompanyRepository } from "../../../repository/prisma/prismaCompanyRepository";
import { PrismaUserCompanyRepository } from "../../../repository/prisma/prismaUserCompanyRepository";
import { PrismaUserRepository } from "../../../repository/prisma/prismaUserRepository";
import { CreateUserUseCase } from "../../../usecase/user/createUserUseCase";
import { beforeEach, describe, expect, it } from "vitest";

import { exec } from "child_process";
import { promisify } from "util";
describe("Create user use case", () => {
  let sut: CreateUserUseCase;
  let userRepository: PrismaUserRepository;
  let companyRepository: PrismaCompanyRepository;
  let userCompanyRepository: PrismaUserCompanyRepository;

  beforeEach(async () => {
    // Opcional: limpar o banco antes de cada teste
    await db.$transaction([
      db.userCompany.deleteMany(),
      db.company.deleteMany(),
      db.user.deleteMany(),
    ]);



// Utilizando promisify para tornar exec assíncrono
const execPromise = promisify(exec);

beforeEach(async () => {
  // Limpar o banco de dados
  await execPromise("npx prisma migrate reset --force"); // Ou outro comando de reset que você preferir
  
  // Aplicar as migrações
  await execPromise("npx prisma migrate deploy");

  // Executar o seed
  await execPromise("npx prisma db seed");

  // Qualquer outra configuração necessária
});


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

    const result = await sut.execute({
      companyId: company.id,
      email: "teste@email.com",
      name: "test",
      password: "test",
      phone: "99999999",
    });

    expect(result).toMatchObject({
      user: {
        id: expect.any(String),
        email: "teste@email.com",
        name: "test",
        phone: "99999999",
      },
    });
  });
});
