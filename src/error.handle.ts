import { ZodError } from "zod";
import { TokenError } from "./error/token.error";
import { ConflictError } from "./error/conflict.error";
import { NotFoundError } from "./error/notfound.error";
import { UnauthorizedError } from "./error/unauthorized.error";
import { fromZodError } from "zod-validation-error";
import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { BadRequestError } from "./error/badRequest.error";
import { env } from "./lib/env";
import { JsonWebTokenError, NotBeforeError, TokenExpiredError } from "jsonwebtoken";

export function errorHandler(error: FastifyError, req: FastifyRequest, res: FastifyReply) {

  if(env.NODE_ENV === "test"){
    console.log(error)
  }

  if (error instanceof ZodError) {
    const zodError = fromZodError(error);

    return res.status(400).send({
      statusCode: 400,
      timestamp: new Date().getTime(),
      instance: zodError.name,
      error: zodError.details,
    });
  }

  if (error instanceof BadRequestError) {
    return res.status(400).send({
      statusCode: 400,
      timestamp: new Date().getTime(),
      instance: "BadRequestError",
      code: error.message,
    });
  }

  if (error instanceof TokenError) {
    return res.status(401).send({
      statusCode: 401,
      timestamp: new Date().getTime(),
      instance: "TokenError",
      code: error.message,
    });
  }

  if (error instanceof TokenExpiredError) {
    return res.status(401).send({
      statusCode: 401,
      timestamp: new Date().getTime(),
      instance: "TokenExpiredError",
      code: error.message,
    });
  }

  if (error instanceof NotBeforeError) {
    return res.status(401).send({
      statusCode: 401,
      timestamp: new Date().getTime(),
      instance: "NotBeforeError",
      code: error.message,
    });
  }

  if (error instanceof JsonWebTokenError) {
    return res.status(401).send({
      statusCode: 401,
      timestamp: new Date().getTime(),
      instance: "NotBeforeError",
      code: error.message,
    });
  }

  if (error instanceof ConflictError) {
    return res.status(409).send({
      statusCode: 409,
      timestamp: new Date().getTime(),
      instance: "ConflictError",
      code: error.message,
    });
  }

  if (error instanceof NotFoundError) {
    return res.status(404).send({
      statusCode: 404,
      timestamp: new Date().getTime(),
      instance: "NotFoundError",
      code: error.message,
    });
  }

  if (error instanceof UnauthorizedError) {
    return res.status(401).send({
      statusCode: 401,
      timestamp: new Date().getTime(),
      instance: "UnauthorizedError",
      error: error.message,
    });
  }

  
  if (error instanceof Error) {
    return res.status(400).send({
      statusCode: 400,
      timestamp: new Date().getTime(),
      error: "FastifyException",
      message: error.message,
    });
  }
  
  return res.status(500).send({
    statusCode: 500,
    timestamp: new Date().getTime(),
    error: "Internal Server Error",
    message:  (error as Error).message || "Unknown error",
  });
}