import { publicProcedure, router } from "@packages/utils/trpc";

export const exampleRouter = router({
  get: publicProcedure.query(async () => {
    return "hello test";
  }),
});
