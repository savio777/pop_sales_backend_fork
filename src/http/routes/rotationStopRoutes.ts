import { FastifyInstance } from "fastify";
import { CreateRotationStopController } from "../controller/stop/createStopController";
import { Auth } from "../middleware/auth";
import { RBAC } from "../middleware/rbac";
import { ListRotationStopByRotationIdController } from "../controller/stop/listStopByRotationIdController";

const createRotationStopController = new CreateRotationStopController()
const listRotationStopByRotationIdController = new ListRotationStopByRotationIdController()
export function RotationStopRoutes(app: FastifyInstance){
  app.post(
    "/",
    {preHandler:[Auth, RBAC(["create.rotation.stop"])]},
    createRotationStopController.handle
  )
  app.get(
    "/:rotationId",
    {preHandler:[Auth, RBAC(["list.rotation.stop"])]},
    listRotationStopByRotationIdController.handle
  )
}