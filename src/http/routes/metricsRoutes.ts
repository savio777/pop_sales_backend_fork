import { FastifyInstance } from "fastify";
import { GetLenghtVisitsController } from "../controller/metrics/getLengtVisitsController";

const getLenghtVisitsController = new GetLenghtVisitsController()
export async function MetricsRoutes(app: FastifyInstance){
  app.get(
    "/visits/user/:userId",
    getLenghtVisitsController.handle
  )
}