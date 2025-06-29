import { app } from "./app";
import { env } from "./env";

app.get("/", async (request, reply) => {
  return app.printRoutes();
});

app
  .listen({
    port: env.PORT,
    host: env.HOST,
  })
  .then(() => {
    console.log("🚀 Http Server Running", env.PORT);
  });
