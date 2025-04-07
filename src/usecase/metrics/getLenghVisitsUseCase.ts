import { db } from "@/lib/prisma"

export class GetLenghVisitsUseCase {
  async execute(
    {userId}:
    {userId: string}
  ) {
    const visits = await db.userRotation.findMany({
      where: {
        userId
      },
      select: {
        Rotation: {
          select: {
            stops: {
              where: {
                status: "COMPLETED"
              },
              select: {
                createdAt: true
              }
            }
          }
        }
      }
    });

    const allStops = visits.flatMap(visit => 
      visit.Rotation?.stops.map(stop => stop.createdAt) ?? []
    );

    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const visitsByDay = allStops.filter(date => 
      date.toDateString() === today.toDateString()
    ).length;

    const visitsByMonth = allStops.filter(date => 
      date >= firstDayOfMonth
    ).length;

    return {
      today: visitsByDay,
      thisMonth: visitsByMonth,
      total: allStops.length
    };
  }
}