import { FastifyInstance } from "fastify";
import { CreateRotationStopController } from "../controller/rotationStop/createRotationStopController";
import { Auth } from "../middleware/auth";
import { RBAC } from "../middleware/rbac";

const createRotationStopController = new CreateRotationStopController()

export function RotationStopRoutes(app: FastifyInstance){
  app.post(
    "/",
    {preHandler:[Auth, RBAC(["create.rotation.stop"])]},
    createRotationStopController.handle
  )
}