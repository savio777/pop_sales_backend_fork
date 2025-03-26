import { FastifyInstance } from "fastify";
import { CreateStopController } from "../controller/stop/createStopController";
import { Auth } from "../middleware/auth";
import { RBAC } from "../middleware/rbac";
import { ListStopByRotationIdController } from "../controller/stop/listStopByRotationIdController";

const createStopController = new CreateStopController()
const listStopByRotationIdController = new ListStopByRotationIdController()
export function StopRoutes(app: FastifyInstance){
  app.post(
    "/",
    {preHandler:[Auth, RBAC(["create.rotation.stop"])]},
    createStopController.handle
  )
  app.get(
    "/:rotationId",
    {preHandler:[Auth, RBAC(["list.rotation.stop"])]},
    listStopByRotationIdController.handle
  )
}