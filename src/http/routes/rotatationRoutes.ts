import { FastifyInstance } from "fastify";
import { CreateRotationController } from "../controller/rotation/createRotationController";
import { Auth } from "../middleware/auth";
import { RBAC } from "../middleware/rbac";

const createRotationController = new CreateRotationController()

export function RotationRoutes(app: FastifyInstance){
  app.post(
    "/",
    {preHandler: [Auth, RBAC(["create.rotation"])]},
    createRotationController.handle
  )
}