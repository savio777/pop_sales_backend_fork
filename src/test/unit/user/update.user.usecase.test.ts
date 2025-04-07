import { NotFoundError } from "@/error/notfound.error";
import { InMemoryCompanyRepository } from "@/repository/inMemory/inMemoryCompanyRepository";
import { InMemoryUserRepository } from "@/repository/inMemory/inMemoryUserRepository";
import { UpdateUserUseCase } from "@/usecase/user/updateUserUseCase";
import { randomUUID } from "crypto";
import { beforeEach, describe, expect, it } from "vitest";

describe("Update user use case", () => {
  let sut: UpdateUserUseCase
  let userRepository: InMemoryUserRepository;
  let companyRepository: InMemoryCompanyRepository;

  beforeEach(async () => {
    userRepository = new InMemoryUserRepository();
    companyRepository = new InMemoryCompanyRepository();

    sut = new UpdateUserUseCase(
      userRepository
    );
  });

  it("should be able update user", async () => {
    const company = await companyRepository.create({
      name: "Company Test",
      status: "ACTIVE"
    });

    const email = "teste@email.com";
    const name = "test";
    const password = "test";
    const phone = "99999999";

    const user = await userRepository.create({
      email,
      name,
      password,
      phone,
    });

    const result = await sut.execute({
      userId: user.id,
      data: {
        email: "updateEmail@email.com",
        name: "update test",
        phone: "8888888888",
        status: "INACTIVE"
      }
    })

    expect(result).toMatchObject({
      user: {
        id: expect.any(String),
        email: "updateEmail@email.com",
        name: "update test",
        phone: "8888888888",
        status: "INACTIVE"
      }
    })
  })

  it("should not be able update if user with id does not exist", async () => {

    const idNotExist = randomUUID()
    await expect(
      sut.execute({
        userId: idNotExist,
        data: {
          status: "ACTIVE"
        }
      })
    ).rejects.toBeInstanceOf(NotFoundError)
  })

})