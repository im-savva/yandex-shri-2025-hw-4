import { describe, expect, it, vi } from "vitest";
import { AnalyticsApi } from "./analytics";
import { CoreApi } from "./main";

describe("AnalyticsApi", () => {
  describe("uploadFile", () => {
    it("should call fetch with correct endpoint and POST", async () => {
      const file = new File(["test"], "test.csv", { type: "text/csv" });
      const mockFetch = vi.fn(() =>
        Promise.resolve({
          body: {
            getReader: () => ({
              read: () =>
                Promise.resolve({ done: true, value: new Uint8Array() }),
            }),
          },
        })
      );
      vi.stubGlobal("fetch", mockFetch);

      await AnalyticsApi.uploadFile(file, 5000);

      expect(mockFetch).toHaveBeenCalledWith(
        `${CoreApi.endpoint}/aggregate?rows=5000`,
        expect.objectContaining({
          method: "POST",
          body: expect.any(FormData),
        })
      );
    });

    it("should throw if response body is null", async () => {
      vi.stubGlobal(
        "fetch",
        vi.fn(() => Promise.resolve({ body: null }))
      );

      const file = new File(["test"], "test.csv", { type: "text/csv" });

      await expect(AnalyticsApi.uploadFile(file)).rejects.toThrow(
        "Не удалось получить поток ответа"
      );
    });

    it("should throw if rowsCount is less than or equal to 0", async () => {
      const file = new File(["test"], "test.csv", { type: "text/csv" });

      await expect(AnalyticsApi.uploadFile(file, 0)).rejects.toThrow(
        "Количество строк должно быть больше 0"
      );
    });
  });
});
