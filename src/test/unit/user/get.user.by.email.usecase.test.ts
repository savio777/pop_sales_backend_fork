import { beforeEach, describe, expect, it } from "vitest";
import { GetUserByEmailUseCase } from "@/usecase/user/getUserByEmailUseCase";
import { InMemoryUserRepository } from "@/repository/inMemory/inMemoryUserRepository";

describe("Get user by email", () => {
  let sut: GetUserByEmailUseCase;
  let userRepository: InMemoryUserRepository;


  beforeEach(async () => {
    userRepository = new InMemoryUserRepository();
    sut = new GetUserByEmailUseCase(userRepository);
  });


  it("should be able get user with email", async () => {
    const email = "teste@email.com";
    const name = "test";
    const password = "test";
    const phone = "99999999";

    await userRepository.create({
      email, name, password, phone
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
