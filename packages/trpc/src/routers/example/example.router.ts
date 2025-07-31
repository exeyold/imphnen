import { publicProcedure, router } from "@packages/utils/trpc";

export const exampleRouter = router({
  get: publicProcedure.query(() => "hello test"),
});
