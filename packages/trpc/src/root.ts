import { router } from "@packages/server/trpc";
import { exampleRouter } from "./routers/example/example.router";

export const trpcRouter = router({
  example: exampleRouter,
});
