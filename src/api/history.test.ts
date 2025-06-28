import { describe, expect, it, vi } from "vitest";
import type { GalacticReport } from "../App.types";
import { validSampleGalacticReport } from "../tests/fixtures/common";

class LocalStorageMock {
  private store: Record<string, string> = {};

  getItem(key: string): string | null {
    return this.store[key] || null;
  }

  setItem(key: string, value: string): void {
    this.store[key] = value;
  }

  removeItem(key: string): void {
    delete this.store[key];
  }

  clear(): void {
    this.store = {};
  }
}

describe("HistoryApi", () => {
  const galacticReports: GalacticReport[] = [validSampleGalacticReport];

  describe("getReports", () => {
    it("should return reports from local storage", async () => {
      const localStorageMock = new LocalStorageMock();
      localStorageMock.setItem("reports", JSON.stringify(galacticReports));
      vi.stubGlobal("localStorage", localStorageMock);

      const { HistoryApi } = await import("./history");

      const reports = HistoryApi.getReports();
      expect(reports).toBeDefined();
      expect(reports).toEqual(galacticReports);
    });

    it('should return empty array if no "reports" key is present in localStorage', async () => {
      const localStorageMock = new LocalStorageMock();
      vi.stubGlobal("localStorage", localStorageMock);

      const { HistoryApi } = await import("./history");

      const reports = HistoryApi.getReports();
      expect(reports).toBeDefined();
      expect(reports).toEqual([]);
    });

    it("should return empty array if reports are not in correct format", async () => {
      const localStorageMock = new LocalStorageMock();
      localStorageMock.setItem("reports", "invalid data");
      vi.stubGlobal("localStorage", localStorageMock);

      const { HistoryApi } = await import("./history");

      const reports = HistoryApi.getReports();
      expect(reports).toBeDefined();
      expect(reports).toEqual([]);
    });
  });

  describe("setReports", () => {
    it("should save reports to local storage", async () => {
      const localStorageMock = new LocalStorageMock();
      vi.stubGlobal("localStorage", localStorageMock);

      const { HistoryApi } = await import("./history");

      HistoryApi.setReports(galacticReports);
      const storedReports = localStorageMock.getItem("reports");
      expect(storedReports).toBeDefined();
      expect(JSON.parse(storedReports!)).toEqual(galacticReports);
    });

    it("should save empty array if reports are not provided", async () => {
      const localStorageMock = new LocalStorageMock();
      vi.stubGlobal("localStorage", localStorageMock);

      const { HistoryApi } = await import("./history");

      HistoryApi.setReports();
      const storedReports = localStorageMock.getItem("reports");
      expect(storedReports).toBeDefined();
      expect(JSON.parse(storedReports!)).toEqual([]);
    });
  });

  describe("removeReport", () => {
    it("should remove report by id", async () => {
      const localStorageMock = new LocalStorageMock();
      localStorageMock.setItem("reports", JSON.stringify(galacticReports));
      vi.stubGlobal("localStorage", localStorageMock);

      const { HistoryApi } = await import("./history");

      HistoryApi.removeReport("1");
      const storedReports = localStorageMock.getItem("reports");
      expect(storedReports).toBeDefined();
      expect(JSON.parse(storedReports!)).toEqual([]);
    });

    it("should not throw if report id does not exist", async () => {
      const localStorageMock = new LocalStorageMock();
      localStorageMock.setItem("reports", JSON.stringify(galacticReports));
      vi.stubGlobal("localStorage", localStorageMock);

      const { HistoryApi } = await import("./history");

      expect(() => HistoryApi.removeReport("non-existent-id")).not.toThrow();
    });
  });

  describe("clearReports", () => {
    it("should clear all reports from local storage", async () => {
      const localStorageMock = new LocalStorageMock();
      localStorageMock.setItem("reports", JSON.stringify(galacticReports));
      vi.stubGlobal("localStorage", localStorageMock);

      const { HistoryApi } = await import("./history");

      HistoryApi.clearReports();
      const storedReports = localStorageMock.getItem("reports");
      expect(storedReports).toBeNull();
    });
  });

  describe("getReportById", () => {
    it("should return report by id", async () => {
      const localStorageMock = new LocalStorageMock();
      localStorageMock.setItem("reports", JSON.stringify(galacticReports));
      vi.stubGlobal("localStorage", localStorageMock);

      const { HistoryApi } = await import("./history");

      const report = HistoryApi.getReportById("1");
      expect(report).toBeDefined();
      expect(report).toEqual(galacticReports[0]);
    });

    it("should return null if report id does not exist", async () => {
      const localStorageMock = new LocalStorageMock();
      localStorageMock.setItem("reports", JSON.stringify(galacticReports));
      vi.stubGlobal("localStorage", localStorageMock);

      const { HistoryApi } = await import("./history");

      const report = HistoryApi.getReportById("non-existent-id");
      expect(report).toBeNull();
    });
  });

  describe("upsertReport", () => {
    it("should add a new report if it does not exist", async () => {
      const localStorageMock = new LocalStorageMock();
      vi.stubGlobal("localStorage", localStorageMock);

      const { HistoryApi } = await import("./history");

      const newReport: GalacticReport = galacticReports[0];

      HistoryApi.upsertReport(newReport);
      const storedReports = localStorageMock.getItem("reports");
      expect(storedReports).toBeDefined();
      expect(JSON.parse(storedReports!)).toEqual([newReport]);
    });

    it("should update an existing report if it exists", async () => {
      const localStorageMock = new LocalStorageMock();
      localStorageMock.setItem("reports", JSON.stringify(galacticReports));
      vi.stubGlobal("localStorage", localStorageMock);

      const { HistoryApi } = await import("./history");

      const updatedReport = {
        ...galacticReports[0],
        total_spend_galactic: 200,
      };
      HistoryApi.upsertReport(updatedReport);
      const storedReports = localStorageMock.getItem("reports");
      expect(storedReports).toBeDefined();
      expect(JSON.parse(storedReports!)).toEqual([updatedReport]);
    });
  });
});
