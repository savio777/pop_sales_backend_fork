import { FastifyInstance } from "fastify";
import { CheckInController } from "../controller/checkIn/checkInController";
import { Auth } from "../middleware/auth";
import { RBAC } from "../middleware/rbac";

const checkInController = new CheckInController()
export function CheckInRoutes(app: FastifyInstance){
  app.post(
    "/",
    {preHandler: [Auth, RBAC(["create.check.in"])]},
    checkInController.handle
  )
}