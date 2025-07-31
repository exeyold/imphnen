import { describe, expect, test } from "vitest";
import { createTestRouter } from "./_";

describe("example router", () => {
  test("example.get returns 'hello test'", async () => {
    const router = createTestRouter();

    const result = await router.example.get();

    expect(result).toBe("hello test");
  });
});
