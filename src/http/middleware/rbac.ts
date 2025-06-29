import { ForbiddenError } from "@/error/forbiddenError.error";
import { FastifyReply, FastifyRequest } from "fastify";

export function RBAC(roles: string[]) {
  return async (req: FastifyRequest, _res: FastifyReply) => {
    if (!req.userAuth?.permissions || !Array.isArray(req.userAuth.permissions)) {
      throw new ForbiddenError("Você não tem permissão para acessar este isto.");
    }

    const allPermissions = req.userAuth.permissions.flatMap(perm => perm.Permission?.permissions || []);

    const hasPermission = allPermissions.some(permission =>
      roles.includes(permission)
    );

    if (!hasPermission) {
      throw new ForbiddenError("Acesso negado. Permissão insuficiente.");
    }
  };
}
