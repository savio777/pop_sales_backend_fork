import { FastifyInstance } from "fastify";
import { SignInController } from "../controller/auth/signInController";
import { SignUpController } from "../controller/auth/signUpController";
import { Auth } from "../middleware/auth";
import { RBAC } from "../middleware/rbac";

const signInController = new SignInController()
const signUpController = new SignUpController()

export function AuthRoutes(app: FastifyInstance){
  app.post("/sign-in", signInController.handle)
  app.post("/sign-up", signUpController.handle)
  app.get("/test", {preHandler: [Auth, RBAC(["get.user", "admin.access"])]},(req, res) => {
    
    return res.status(200).send("passou!")
  })
} 