import { BadRequestError } from "@/error/badRequest.error";
import { CheckOutUseCase } from "./checkOutUseCase";
import {
  mockCheckInCheckOutRepository,
  mockClientRepository,
  mockRotationRepository,
  mockStopRepository,
  mockUserRepository,
} from "@/test/mocks/mockRepositoryJest";
import {
  mockCheckInCheckOut,
  mockCheckInCheckOutCreate,
  mockClient,
  mockRotation,
  mockStop,
  mockUser,
} from "@/test/mocks/mockEntities";
import { NotFoundError } from "@/error/notfound.error";
import { UnauthorizedError } from "@/error/unauthorized.error";

import { getDistance } from "@/service/getDistance";
jest.mock("@/service/getDistance", () => ({
  getDistance: jest.fn(),
}));

describe("checkout usecase", () => {
  let sut: CheckOutUseCase;

  beforeEach(() => {
    sut = new CheckOutUseCase(
      mockCheckInCheckOutRepository as any,
      mockUserRepository as any,
      mockClientRepository as any,
      mockStopRepository as any,
      mockRotationRepository as any
    );
    jest.clearAllMocks();
  });

  it("should not be able to checkout if  lat and lon is not provided", async () => {
    await expect(
      sut.execute({
        ...mockCheckInCheckOutCreate,
        lat: "",
        lon: "",
      })
    ).rejects.toBeInstanceOf(BadRequestError);
  });

  it("should not be able to checkout if user does not exist", async () => {
    mockUserRepository.getById.mockResolvedValue(null);

    await expect(sut.execute(mockCheckInCheckOutCreate)).rejects.toBeInstanceOf(
      NotFoundError
    );
  });

  it("should not be able to checkout if client does not exist", async () => {
    mockUserRepository.getById.mockResolvedValue(mockUser);
    mockClientRepository.getById.mockResolvedValue(null);

    await expect(sut.execute(mockCheckInCheckOutCreate)).rejects.toBeInstanceOf(
      NotFoundError
    );
  });

  it("should not be able to checkout if client does not exist", async () => {
    mockUserRepository.getById.mockResolvedValue(mockUser);
    mockClientRepository.getById.mockResolvedValue({
      ...mockClient,
      lat: "",
      lon: "",
    });

    await expect(sut.execute(mockCheckInCheckOutCreate)).rejects.toBeInstanceOf(
      BadRequestError
    );
  });

  it("should not be able to checkout if stop does not exist", async () => {
    mockUserRepository.getById.mockResolvedValue(mockUser);
    mockClientRepository.getById.mockResolvedValue(mockClient);
    mockStopRepository.getById.mockResolvedValue(null);

    await expect(sut.execute(mockCheckInCheckOutCreate)).rejects.toBeInstanceOf(
      NotFoundError
    );
  });

  it("should not be able to checkout if stop is completed", async () => {
    mockUserRepository.getById.mockResolvedValue(mockUser);
    mockClientRepository.getById.mockResolvedValue(mockClient);
    mockStopRepository.getById.mockResolvedValue({
      ...mockStop,
      status: "COMPLETED",
    });

    await expect(sut.execute(mockCheckInCheckOutCreate)).rejects.toBeInstanceOf(
      BadRequestError
    );
  });

  it("should not be able to checkout if rotation not exist", async () => {
    mockUserRepository.getById.mockResolvedValue(mockUser);
    mockClientRepository.getById.mockResolvedValue(mockClient);
    mockStopRepository.getById.mockResolvedValue({
      ...mockStop,
      status: "PENDING",
    });
    mockRotationRepository.getById.mockResolvedValue(null);

    await expect(sut.execute(mockCheckInCheckOutCreate)).rejects.toBeInstanceOf(
      NotFoundError
    );
  });

  it("should not be able to checkout if distance is greater than 100m", async () => {
    mockUserRepository.getById.mockResolvedValue(mockUser);
    mockClientRepository.getById.mockResolvedValue(mockClient);
    mockStopRepository.getById.mockResolvedValue({
      ...mockStop,
      status: "PENDING",
    });
    mockRotationRepository.getById.mockResolvedValue(mockRotation);

    //mockar  getDistance para retornar 101 in number
    (getDistance as jest.Mock).mockReturnValue(101);

    await expect(sut.execute(mockCheckInCheckOutCreate)).rejects.toBeInstanceOf(
      UnauthorizedError
    );
  });

  it("should not be able to checkout if checkIn does not exist", async () => {
    mockUserRepository.getById.mockResolvedValue(mockUser);
    mockClientRepository.getById.mockResolvedValue(mockClient);
    mockStopRepository.getById.mockResolvedValue({
      ...mockStop,
      status: "PENDING",
    });
    mockRotationRepository.getById.mockResolvedValue(mockRotation);
    (getDistance as jest.Mock).mockReturnValue(99);
    mockCheckInCheckOutRepository.getById.mockResolvedValue(null);

    await expect(sut.execute(mockCheckInCheckOutCreate)).rejects.toBeInstanceOf(
      NotFoundError
    );
  });

  it("should be able to checkout", async () => {
    mockUserRepository.getById.mockResolvedValue(mockUser);
    mockClientRepository.getById.mockResolvedValue(mockClient);
    mockStopRepository.getById.mockResolvedValue({
      ...mockStop,
      status: "PENDING",
    });
    mockRotationRepository.getById.mockResolvedValue(mockRotation);
    (getDistance as jest.Mock).mockReturnValue(99);
    mockCheckInCheckOutRepository.getById.mockResolvedValue(
      mockCheckInCheckOut
    );

    const result = await sut.execute(mockCheckInCheckOutCreate);
    expect(result).toMatchObject({
      message: expect.any(String),
    });
  });
});
