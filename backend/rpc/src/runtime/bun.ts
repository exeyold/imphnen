import {
  getAPIConfigs,
  getDefaultResponse,
  getNotFoundResponse,
  RPCAdapter,
  startLog,
} from "../helper";

Bun.serve({
  port: getAPIConfigs().PORT,
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname;

    if (path === "/") {
      return new Response(JSON.stringify(getDefaultResponse()), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (path === "/procedure") {
      const body = getNotFoundResponse({ method: request.method, path });
      return new Response(JSON.stringify(body), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (path.startsWith("/procedure/")) {
      try {
        return await RPCAdapter(request);
      } catch (err) {
        console.error("❌ RPCAdapter threw error:", err);
        const body = getNotFoundResponse({ method: request.method, path });
        return new Response(JSON.stringify(body), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        });
      }
    }

    // Fallback for all other routes
    return new Response(
      JSON.stringify({
        error: "Endpoint not found",
        method: request.method,
        path,
      }),
      { status: 404, headers: { "Content-Type": "application/json" } }
    );
  },
});

startLog();
