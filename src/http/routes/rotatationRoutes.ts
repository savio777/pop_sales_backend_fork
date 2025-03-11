import { FastifyInstance } from "fastify";
import { CreateRotationController } from "../controller/rotation/createRotationController";
import { Auth } from "../middleware/auth";
import { RBAC } from "../middleware/rbac";
import { ListRotationsUserAssignedController } from "../controller/rotation/listRotationsUserAssignedController";

const createRotationController = new CreateRotationController()
const listRotationsUserAssignedController = new ListRotationsUserAssignedController()

export function RotationRoutes(app: FastifyInstance){
  app.post(
    "/",
    {preHandler: [Auth, RBAC(["create.rotation"])]},
    createRotationController.handle
  )
  app.get(
    "/",
    {preHandler: [Auth, RBAC(["list.my.rotations"])]},
    listRotationsUserAssignedController.handle
  )
}