import { FastifyInstance } from "fastify";
import { CreateTaskController } from "../controller/task/createTaskController";
import { Auth } from "../middleware/auth";
import { RBAC } from "../middleware/rbac";

const createTaskController = new CreateTaskController()
export function TaskRoutes(app: FastifyInstance){
  app.post(
    "/",
    {preHandler: [Auth, RBAC(["create.task"])]},
    createTaskController.handle

  )
}