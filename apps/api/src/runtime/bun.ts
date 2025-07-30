import { Elysia } from "elysia";
import {
  CONSTANT,
  getDefaultResponse,
  getNotFoundResponse,
  startLog,
  TRPCAdapter,
} from "../configs";

export const app = new Elysia({ strictPath: false })
  .get("/", getDefaultResponse())

  .get("/procedure", ({ request }) => {
    const method = request.method;
    const path = request.url;

    return getNotFoundResponse({ method, path });
  })

  .all("/procedure/*", async (opts) => {
    return await TRPCAdapter(opts.request);
  })

  .onError(({ code, set, request }) => {
    if (code === "NOT_FOUND") {
      set.status = 404;
      return {
        error: "Endpoint not found",
        method: request.method,
        path: request.url,
      };
    }
  })

  .listen(CONSTANT.PORT);

startLog();
