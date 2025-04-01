import { FastifyInstance } from "fastify";
import { Auth } from "../middleware/auth";
import { RBAC } from "../middleware/rbac";
import { CheckOutController } from "../controller/checkOut/checkOutController";

const checkOutController = new CheckOutController()
export function CheckOutRoutes(app: FastifyInstance){
  app.post(
    "/",
    {preHandler: [Auth, RBAC(["create.check.out"])]},
    checkOutController.handle
  )
}