import { db } from "@/lib/prisma";

export class CalculateAverageTimeBetweenVisitsUseCase {
  async execute({ userId }: { userId: string }) {
    const userRotations = await db.userRotation.findMany({
      where: {
        userId
      },
      select: {
        Rotation: {
          select: {
            stops: {
              where: {
                finalizedAt: {
                  not: null
                }
              },
              select: {
                id: true,
                createdAt: true,
                finalizedAt: true,
                client: {
                  select: {
                    name: true
                  }
                }
              }
            }
          }
        }
      }
    });

    const allStops = userRotations.flatMap(ur => ur.Rotation?.stops || []);

    if (allStops.length === 0) {
      return {
        daily: { average: 0, total: 0 },
        monthly: { average: 0, total: 0 },
        total: { average: 0, total: 0 }
      };
    }

    const calculateDuration = (stop: typeof allStops[0]) => {
      const start = new Date(stop.createdAt);
      const end = new Date(stop.finalizedAt!);
      return (end.getTime() - start.getTime()) / (1000 * 60); // Convert to minutes
    };

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const dailyStops = allStops.filter(stop => {
      const stopDate = new Date(stop.createdAt);
      stopDate.setHours(0, 0, 0, 0);
      return stopDate.getTime() === today.getTime();
    });

    const monthlyStops = allStops.filter(stop => 
      new Date(stop.createdAt) >= firstDayOfMonth
    );

    const calculateAverage = (stops: typeof allStops) => {
      if (stops.length === 0) return 0;
      const totalDuration = stops.reduce((acc, stop) => acc + calculateDuration(stop), 0);
      return Math.round(totalDuration / stops.length);
    };

    return {
      daily: {
        average: calculateAverage(dailyStops),
        total: dailyStops.length
      },
      monthly: {
        average: calculateAverage(monthlyStops),
        total: monthlyStops.length
      },
      total: {
        average: calculateAverage(allStops),
        total: allStops.length
      }
    };
  }
}