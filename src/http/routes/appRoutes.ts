import { FastifyInstance } from "fastify";
import { AuthRoutes } from "./authRoute";
import { CompanyRoutes } from "./companyRoutes";

export function AppRoutes(app: FastifyInstance){
  app.register(AuthRoutes, {prefix: "/auth"})
  app.register(CompanyRoutes, {prefix: "/company"})
}