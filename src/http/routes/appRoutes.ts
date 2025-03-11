import { FastifyInstance } from "fastify";
import { AuthRoutes } from "./authRoute";
import { CompanyRoutes } from "./companyRoutes";
import { UserCompanyRoutes } from "./userCompanyRoutes";
import { UserRoutes } from "./userRoutes";
import { RotationRoutes } from "./rotatationRoutes";

export function AppRoutes(app: FastifyInstance){
  app.register(AuthRoutes, {prefix: "/auth"})
  app.register(CompanyRoutes, {prefix: "/company"})
  app.register(UserRoutes, {prefix: "/user"})
  app.register(UserCompanyRoutes, {prefix: "/user-company"})
  app.register(RotationRoutes, {prefix: "/rotation"})
}