import { FastifyInstance } from "fastify";
import { CreateRotationController } from "../controller/rotation/createRotationController";
import { Auth } from "../middleware/auth";
import { RBAC } from "../middleware/rbac";
import { ListRotationsUserAssignedController } from "../controller/rotation/listRotationsUserAssignedController";
import { ListRotationsUserCreatedController } from "../controller/rotation/listRotationsUserCreatedController";
import { DeleteRotationController } from "../controller/rotation/deleteRotationController";

const createRotationController = new CreateRotationController()
const listRotationsUserAssignedController = new ListRotationsUserAssignedController()
const listRotationsUserCreatedController = new ListRotationsUserCreatedController()
const deleteRotationController = new DeleteRotationController()

export function RotationRoutes(app: FastifyInstance){
  app.post(
    "/",
    {preHandler: [Auth, RBAC(["create.rotation"])]},
    createRotationController.handle
  )
  app.get(
    "/assigned-to-me",
    {preHandler: [Auth, RBAC(["list.rotations.assigned.to.me"])]},
    listRotationsUserAssignedController.handle
  )
  app.get(
    "/created-by-me",
    {preHandler: [Auth, RBAC(["list.rotations.created.by.me"])]},
    listRotationsUserCreatedController.handle
  )
  app.delete(
    "/:rotationId",
    {preHandler: [Auth, RBAC(["delete.rotation"])]},
    deleteRotationController.handle
  )
}