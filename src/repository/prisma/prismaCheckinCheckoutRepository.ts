import { Prisma, CheckinCheckout } from "@prisma/client";
import { CheckInCheckOutRepository } from "../checkinCheckoutRepository";
import { db } from "@/lib/prisma";
import { startOfDay, endOfDay } from "date-fns";

export class PrismaCheckInCheckOutRepository implements CheckInCheckOutRepository {
  async getById(id: string): Promise<CheckinCheckout | null> {
    const checkInCheckout = await db.checkinCheckout.findUnique({
      where: {
        id,
      },
    });
    return checkInCheckout;
  }

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

  async create({
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

  async update({
    id,
    data,
  }: {
    id: string;
    data: Prisma.CheckinCheckoutUpdateInput;
  }): Promise<CheckinCheckout | null> {
    const checkInChekcOut = await db.checkinCheckout.update({
      where: {
        id,
      },
      data,
    });
    return checkInChekcOut;
  }
}
