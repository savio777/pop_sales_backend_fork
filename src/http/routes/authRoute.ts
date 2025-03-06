import { FastifyInstance } from "fastify";
import { SignInController } from "../controller/auth/signInController";
import { SignUpController } from "../controller/auth/signUpController";

const signInController = new SignInController()
const signUpController = new SignUpController()

export function AuthRoutes(app: FastifyInstance){
  app.post("/sign-in", signInController.handle)
  app.post("/sign-up", signUpController.handle)
} 