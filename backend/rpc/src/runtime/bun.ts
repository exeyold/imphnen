import {
  forwardToRPC,
  getAPIConfigs,
  getDefaultResponse,
  getInternalServerErrorResponse,
  getNotFoundResponse,
  startLog,
} from "../helper";

Bun.serve({
  port: getAPIConfigs().PORT,
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    if (path === "/") {
      return new Response(JSON.stringify(getDefaultResponse()), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (path.startsWith("/")) {
      try {
        return await forwardToRPC(request);
      } catch (err) {
        console.error("❌ RPCForwarder threw error:", err);
        return new Response(
          JSON.stringify(getInternalServerErrorResponse({ method, path })),
          {
            status: 500,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
    }

    // Fallback for all other routes
    return new Response(JSON.stringify(getNotFoundResponse({ method, path })), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  },
});

startLog();
