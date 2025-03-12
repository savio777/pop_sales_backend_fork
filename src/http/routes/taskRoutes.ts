import { FastifyInstance } from "fastify";
import { CreateTaskController } from "../controller/task/createTaskController";
import { Auth } from "../middleware/auth";
import { RBAC } from "../middleware/rbac";
import { DeleteTaskController } from "../controller/task/deleteTaskController";

const createTaskController = new CreateTaskController()
const deleteTaskController = new DeleteTaskController()

export function TaskRoutes(app: FastifyInstance){
  app.post(
    "/",
    {preHandler: [Auth, RBAC(["create.task"])]},
    createTaskController.handle
  )
  app.delete(
    "/:taskId",
    {preHandler: [Auth, RBAC(["delete.task"])]},
    deleteTaskController.handle
  )
}