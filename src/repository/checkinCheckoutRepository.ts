import { CheckinCheckout } from "@prisma/client";

export interface CheckInCheckOutRepository {
  checkIn({
    userId,
    clientId,
  }: {
    userId: string;
    clientId: string;
  }): Promise<CheckinCheckout>;
  checkOut({
    checkInChekcOutId,
  }: {
    checkInChekcOutId: string;
  }): Promise<CheckinCheckout>;
}
