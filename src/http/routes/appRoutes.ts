import { FastifyInstance } from "fastify";
import { AuthRoutes } from "./authRoute";

export function AppRoutes(app: FastifyInstance){
  app.register(AuthRoutes, {prefix: "/auth"})
}