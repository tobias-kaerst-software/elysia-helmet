import { Elysia } from "elysia";
import { helmet } from "elysia-helmet";

const app = new Elysia()
  .use(helmet())
  .get("/", () => "Hello Elysia")
  .listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
