import { getJWT, validateToken } from "@packages/utils/jwt";
import { publicProcedure, router } from "@packages/utils/trpc";
import { TRPCError } from "@trpc/server";

export const exampleRouter = router({
  get: publicProcedure.query(async ({ ctx }) => {
    const sessionToken = ctx.cookie.get("_imphnen_token_");

    if (!sessionToken) throw new TRPCError({ code: "UNAUTHORIZED" });

    const jwt = await getJWT(sessionToken);

    const payload = await validateToken(jwt);

    return payload;
  }),
});
