import { FastifyInstance } from "fastify";
import { SignInController } from "../controller/auth/signInController";
import { SignUpController } from "../controller/auth/signUpController";
import { ChangePasswordController } from "../controller/auth/ChangePasswordController";

const signInController = new SignInController();
const signUpController = new SignUpController();
const changePasswordController = new ChangePasswordController();

export function AuthRoutes(app: FastifyInstance) {
  app.post("/sign-in", signInController.handle);
  app.post("/sign-up", signUpController.handle);
  app.post("/change-password", changePasswordController.handler);
} 