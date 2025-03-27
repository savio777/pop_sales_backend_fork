import { FastifyInstance } from "fastify";
import { CreateClientController } from "../controller/client/createClientController";
import { Auth } from "../middleware/auth";
import { RBAC } from "../middleware/rbac";

const createClientController = new CreateClientController()
export function ClientRoutes(app: FastifyInstance) {
  app.post(
    "/", 
    {preHandler: [Auth, RBAC(["create.client"])]},
    createClientController.handle
  )
}