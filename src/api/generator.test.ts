import { describe, expect, it, vi } from "vitest";

describe("GeneratorApi", () => {
  describe("downloadFile", () => {
    it("should download file with default parameters", async () => {
      const mockFetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          body: new Blob(["test content"]),
          blob: () => Promise.resolve(new Blob(["test content"])),
        })
      );
      vi.stubGlobal("fetch", mockFetch);

      const { GeneratorApi } = await import("./generator");
      const blob = await GeneratorApi.downloadFile();

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining("/report?size=0.001&withErrors=on&maxSpend=5000"),
        { method: "GET" }
      );
      expect(blob).toBeInstanceOf(Blob);
    });

    it("should throw error for invalid size", async () => {
      const { GeneratorApi } = await import("./generator");

      await expect(GeneratorApi.downloadFile(-1)).rejects.toThrow(
        "Размер файла должен быть больше 0"
      );
    });

    it("should throw error for invalid maxSpend", async () => {
      const { GeneratorApi } = await import("./generator");

      await expect(GeneratorApi.downloadFile(0.1, true, -100)).rejects.toThrow(
        "Максимальная сумма должна быть больше 0"
      );
    });
  });
});
