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
  getCheckInByDate({
    userId,
    clientId,
    date
  }: {
    userId: string;
    clientId: string;
    date: Date
  }): Promise<CheckinCheckout | null>
}
