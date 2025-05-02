import { FastifyInstance } from "fastify";
import { SignInController } from "../controller/auth/signInController";
import { SignUpController } from "../controller/auth/signUpController";
import { ChangePasswordController } from "../controller/auth/ChangePasswordController";
import { PasswordRecoverySendEmailController } from "../controller/auth/passwordRecoverySendEmailController";

const signInController = new SignInController();
const signUpController = new SignUpController();
const changePasswordController = new ChangePasswordController();
const passwordRecoverySendEmailController = new PasswordRecoverySendEmailController();

export function AuthRoutes(app: FastifyInstance) {
  app.post("/sign-in", signInController.handle);
  app.post("/sign-up", signUpController.handle);
  app.post("/change-password", changePasswordController.handle);
  app.post("/password/recovery-email", passwordRecoverySendEmailController.handle);
} 