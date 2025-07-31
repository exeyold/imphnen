import { router } from "@packages/utils/trpc";
import { exampleRouter } from "./routers/example/example.router";

export const trpcRouter = router({
  example: exampleRouter,
});

export type TrpcRouter = typeof trpcRouter;
