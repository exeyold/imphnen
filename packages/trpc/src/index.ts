import { publicProcedure, router } from "@packages/utils/trpc";

export const trpcRouter = router({
  greeting: publicProcedure.query(() => "hello tRPC v10!"),
});

export type TrpcRouter = typeof trpcRouter;
