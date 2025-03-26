import { FastifyInstance } from "fastify";
import { CreateTaskController } from "../controller/task/createTaskController";
import { Auth } from "../middleware/auth";
import { RBAC } from "../middleware/rbac";
import { DeleteTaskController } from "../controller/task/deleteTaskController";
import { GetTaskByIdController } from "../controller/task/getTaskByIdController";
import { UpdateTaskController } from "../controller/task/updateTaskController";
import { ListTaskByStopIdController } from "../controller/task/listTaskByStopIdController";

const createTaskController = new CreateTaskController()
const deleteTaskController = new DeleteTaskController()
const getTaskByIdController = new GetTaskByIdController()
const updateTaskController = new UpdateTaskController()
const listTaskByStopIdController = new ListTaskByStopIdController()

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
  app.get(
    "/:taskId",
    {preHandler: [Auth, RBAC(["get.task.by.id"])]},
    getTaskByIdController.handle
  )
  app.patch(
    "/:taskId",
    {preHandler: [Auth, RBAC(["update.task"])]},
    updateTaskController.handle
  )
  app.get(
    "/",
    {preHandler: [Auth, RBAC(["list.task"])]},
    listTaskByStopIdController.handle
  )

}