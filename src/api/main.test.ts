import { expect, describe, it } from "vitest";

describe("CoreApi", async () => {
  it("should have a valid endpoint", async () => {
    const { CoreApi } = await import("./main");
    expect(CoreApi.endpoint).toBeDefined();
    expect(CoreApi.endpoint).toBe("http://localhost:3000");
  });
});
