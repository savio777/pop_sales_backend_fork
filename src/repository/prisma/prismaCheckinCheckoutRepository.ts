import { Prisma, CheckinCheckout } from "@prisma/client";
import { CheckInCheckOutRepository } from "../checkinCheckoutRepository";
import { db } from "@/lib/prisma";

export class PrismaCheckInCheckOutRepository
  implements CheckInCheckOutRepository
{
  async checkIn({
    userId,
    clientId,
  }: {
    userId: string;
    clientId: string;
  }): Promise<CheckinCheckout> {
    const checkInChekcOut = await db.checkinCheckout.create({
      data: {
        clientId,
        userId,
      },
    });
    return checkInChekcOut;
  }
  async checkOut({
    checkInChekcOutId,
  }: {
    checkInChekcOutId: string;
  }): Promise<CheckinCheckout> {
    const checkInChekcOut = await db.checkinCheckout.update({
      where: {
        id: checkInChekcOutId,
      },
      data: {
        finalizedAt: new Date(),
      },
    });
    return checkInChekcOut;
  }
}
