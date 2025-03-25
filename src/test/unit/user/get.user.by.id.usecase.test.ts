import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUserRepository } from "@/repository/inMemory/inMemoryUserRepository";
import { GetUserByIdUseCase } from "@/usecase/user/getUserByIdUseCase";
import { randomUUID } from "crypto";
import { NotFoundError } from "@/error/notfound.error";

describe("Get user by id", () => {
  let sut: GetUserByIdUseCase;
  let userRepository: InMemoryUserRepository;

  beforeEach(async () => {
    userRepository = new InMemoryUserRepository();
    sut = new GetUserByIdUseCase(userRepository);
  });

  it("should be able get user by id", async () => {
    const email = "teste@email.com";
    const name = "test";
    const password = "test";
    const phone = "99999999";

    const userCreated = await userRepository.create({
      email, name, password, phone
    })

    const user = await sut.execute(userCreated.id)

    expect(user).toMatchObject({
      user: {
        id: expect.any(String),
        email,
        name,
        phone,
      },
    });
  });

  it("should not be able get user if not exist user with id", async () => {
    const idNotExist = randomUUID()

    await expect(
      sut.execute(idNotExist)
    ).rejects.toBeInstanceOf(NotFoundError)
  });
});