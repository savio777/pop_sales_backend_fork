import { FastifyInstance } from "fastify";
import { GetLenghtVisitsController } from "../controller/metrics/getLengtVisitsController";
import { Auth } from "../middleware/auth";
import { CalculateAverageTimeBetweenVisitsController } from "../controller/metrics/CalculateAverageTimeBetweenVisitsController";

const getLenghtVisitsController = new GetLenghtVisitsController()
const calculateAverageTimeBetweenVisitsController = new CalculateAverageTimeBetweenVisitsController()
export async function MetricsRoutes(app: FastifyInstance){
  app.get(
    "/visits/user/:userId",
    {preHandler: [Auth]},
    getLenghtVisitsController.handle
  )
  app.get(
    "/average-time/vitits/user/:userId",
    {preHandler: [Auth]},
    calculateAverageTimeBetweenVisitsController.handle
  )
}