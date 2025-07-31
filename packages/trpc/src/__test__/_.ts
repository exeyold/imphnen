import { trpcRouter } from "..";

export function createTestRouter() {
  return trpcRouter.createCaller({
    cookie: {
      getAll: () => ({}),
      get: () => undefined,
      set: () => {},
      delete: () => {},
    },
    req: new Request("http://localhost"),
    resHeaders: new Headers(),
  });
}
