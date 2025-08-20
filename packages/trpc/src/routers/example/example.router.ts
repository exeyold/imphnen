import { publicProcedure, router } from "@packages/server/trpc";

export const exampleRouter = router({
  get: publicProcedure.query(async () => {
    return "hello test";
  }),
});
