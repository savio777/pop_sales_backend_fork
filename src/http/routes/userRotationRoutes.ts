import { FastifyInstance } from "fastify";
import { CreateUserRotationController } from "../controller/userRotation/createUserRotationController";

const createUserRotationController = new CreateUserRotationController()

export async function UserRotationRoutes(app: FastifyInstance){
  app.post("/", createUserRotationController.handle)
}