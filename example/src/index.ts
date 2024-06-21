import { Elysia } from "elysia";
import { helmet } from "elysia-helmet";

const app = new Elysia({ aot: false })
  .use(helmet())
  .get("/", () => "Hello Elysia")
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
