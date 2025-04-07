import { CheckinCheckout, Prisma } from "@prisma/client";

export interface CheckInCheckOutRepository {
  create({
    userId,
    clientId,
  }: {
    userId: string;
    clientId: string;
  }): Promise<CheckinCheckout>;
  update(    
    {id, data}:
    { id: string, data: Prisma.CheckinCheckoutUpdateInput}
  ): Promise<CheckinCheckout | null>;
  getCheckInByDate({
    userId,
    clientId,
    date
  }: {
    userId: string;
    clientId: string;
    date: Date
  }): Promise<CheckinCheckout | null>,
  getById(id: string): Promise<CheckinCheckout | null>
}
