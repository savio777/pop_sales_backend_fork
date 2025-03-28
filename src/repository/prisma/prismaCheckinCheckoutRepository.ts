import { Prisma, CheckinCheckout } from "@prisma/client";
import { CheckInCheckOutRepository } from "../checkinCheckoutRepository";
import { db } from "@/lib/prisma";
import { startOfDay, endOfDay } from "date-fns";

export class PrismaCheckInCheckOutRepository implements CheckInCheckOutRepository {
  async getCheckInByDate({
    userId,
    clientId,
    date,
  }: {
    userId: string;
    clientId: string;
    date: Date;
  }): Promise<CheckinCheckout | null> {
    const checkInCheckout = await db.checkinCheckout.findFirst({
      where: {
        userId,
        clientId,
        createdAt: {
          gte: startOfDay(date), 
          lt: endOfDay(date), 
        },
      },
    });

    return checkInCheckout;
  }
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
