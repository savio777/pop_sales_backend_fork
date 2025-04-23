import {
  mockCheckInCheckOutRepository,
  mockClientRepository,
  mockStopRepository,
  mockUserRepository,
} from "@/test/mocks/mockRepositoryJest";
import { CheckInUseCase } from "./checkInUseCase";
import {
  mockCheckInCheckOut,
  mockClient,
  mockStop,
  mockUser,
} from "@/test/mocks/mockEntities";
import { NotFoundError } from "@/error/notfound.error";
import { BadRequestError } from "@/error/badRequest.error";
import { randomUUID } from "crypto";
import { UnauthorizedError } from "@/error/unauthorized.error";

describe("check in usecase", () => {
  let sut: CheckInUseCase;

  beforeEach(() => {
    sut = new CheckInUseCase(
      mockCheckInCheckOutRepository as any,
      mockUserRepository as any,
      mockClientRepository as any,
      mockStopRepository as any
    );
    jest.clearAllMocks();
  });

  it("should not be able to check in if lat and lon were not informed", async () => {
    await expect(
      sut.execute({
        userId: mockUser.id,
        clientId: mockClient.id,
        lon: "",
        lat: "",
        stopId: mockStop.id,
      })
    ).rejects.toBeInstanceOf(BadRequestError);
  });

  it("should be able to check in", async () => {
    mockUserRepository.getById.mockResolvedValueOnce(mockUser);
    mockClientRepository.getById.mockResolvedValueOnce({
      ...mockClient,
      lat: "1",
      lon: "1",
    });
    mockStopRepository.getById.mockResolvedValueOnce({
      ...mockStop,
      status: "PENDING",
    });
    mockCheckInCheckOutRepository.create.mockResolvedValueOnce(
      mockCheckInCheckOut
    );

    const { checkIn } = await sut.execute({
      userId: mockUser.id,
      clientId: mockClient.id,
      lon: "1",
      lat: "1",
      stopId: mockStop.id,
    });

    expect(checkIn).toEqual({
      ...mockCheckInCheckOut,
      serviceDuration: expect.any(Number),
    });
  });

  it("should not be able to check in if user not found", async () => {
    mockUserRepository.getById.mockResolvedValue(null);

    await expect(
      sut.execute({
        userId: mockUser.id,
        clientId: mockClient.id,
        lon: "1",
        lat: "1",
        stopId: mockStop.id,
      })
    ).rejects.toBeInstanceOf(NotFoundError);
  });

  it("should not be able to check in if client not found", async () => {
    mockUserRepository.getById.mockResolvedValue(mockUser);
    mockClientRepository.getById.mockResolvedValue(null);

    await expect(
      sut.execute({
        userId: mockUser.id,
        clientId: mockClient.id,
        lon: "1",
        lat: "1",
        stopId: mockStop.id,
      })
    ).rejects.toBeInstanceOf(NotFoundError);
  });

  it("should not be able to check in if client has no lat and lon", async () => {
    mockUserRepository.getById.mockResolvedValue(mockUser);
    mockClientRepository.getById.mockResolvedValue({
      ...mockClient,
      lat: "",
      lon: "",
    });
    mockStopRepository.getById.mockResolvedValue(mockStop);

    await expect(
      sut.execute({
        userId: mockUser.id,
        clientId: mockClient.id,
        lon: "1",
        lat: "1",
        stopId: mockStop.id,
      })
    ).rejects.toBeInstanceOf(BadRequestError);
  });

  it("should not be able to check in if stop not found", async () => {
    mockUserRepository.getById.mockResolvedValue(mockUser);
    mockClientRepository.getById.mockResolvedValue(mockClient);
    mockStopRepository.getById.mockResolvedValue(null);

    await expect(
      sut.execute({
        userId: mockUser.id,
        clientId: mockClient.id,
        lon: "1",
        lat: "1",
        stopId: mockStop.id,
      })
    ).rejects.toBeInstanceOf(NotFoundError);
  });

  it("should not be able to check in if client has no lat and lon", async () => {
    mockUserRepository.getById.mockResolvedValue(mockUser);
    mockClientRepository.getById.mockResolvedValue({
      ...mockClient,
      lat: "",
      lon: "",
    });
    mockStopRepository.getById.mockResolvedValue(mockStop);

    await expect(
      sut.execute({
        userId: mockUser.id,
        clientId: mockClient.id,
        lon: "1",
        lat: "1",
        stopId: mockStop.id,
      })
    ).rejects.toBeInstanceOf(BadRequestError);
  });

  it("should not be able to check in if status stop is COMPLETED", async () => {
    mockUserRepository.getById.mockResolvedValue(mockUser);
    mockClientRepository.getById.mockResolvedValue(mockClient);
    mockStopRepository.getById.mockResolvedValue({
      ...mockStop,
      status: "COMPLETED",
    });

    await expect(
      sut.execute({
        userId: mockUser.id,
        clientId: mockClient.id,
        lon: "1",
        lat: "1",
        stopId: mockStop.id,
      })
    ).rejects.toBeInstanceOf(BadRequestError);
  });

  it("should not be able to check in if the client is not in the rotation", async () => {
    mockUserRepository.getById.mockResolvedValue(mockUser);
    mockClientRepository.getById.mockResolvedValue({
      ...mockClient,
      id: randomUUID(),
    });
    mockStopRepository.getById.mockResolvedValue({
      ...mockStop,
      clientId: randomUUID(), // id diferente do clientId da parada
    });

    await expect(
      sut.execute({
        userId: mockUser.id,
        clientId: mockClient.id,
        lon: "1",
        lat: "1",
        stopId: mockStop.id,
      })
    ).rejects.toBeInstanceOf(BadRequestError);
  });

  it("should not be able to check in if distance is greater than 100m", async () => {
    mockUserRepository.getById.mockResolvedValueOnce(mockUser);
    mockClientRepository.getById.mockResolvedValueOnce({
      ...mockClient,
      lat: "-3.092265282204903", //amazônas shopping center
      lon: "-60.02258689984318",
    });
    mockStopRepository.getById.mockResolvedValueOnce({
      ...mockStop,
      status: "PENDING",
    });
    mockCheckInCheckOutRepository.create.mockResolvedValueOnce(
      mockCheckInCheckOut
    );

    await expect(
      sut.execute({
        userId: mockUser.id,
        clientId: mockClient.id,
        lat: "-3.1295256466794497", //teatro amazônas
        lon: "-60.022606691880604",
        stopId: mockStop.id,
      })
    ).rejects.toBeInstanceOf(UnauthorizedError);
  });
});
