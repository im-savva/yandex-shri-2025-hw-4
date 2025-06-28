import { describe, expect, it, vi } from "vitest";
import {
  invalidSampleGalacticReport,
  rawInvalidSampleGalacticReport,
  rawValidSampleGalacticReport,
  validSampleGalacticReport,
} from "../tests/fixtures/common";

describe("Analytics Service", () => {
  describe("generateId", () => {
    it("should generate valid ID 8 characters long", async () => {
      const { AnalyticsService } = await import("./analytics");

      const id = AnalyticsService.generateId();
      expect(id).toBeDefined();
      expect(id.length).toBe(8);
    });
  });

  describe("validateFile", () => {
    it("should return true for valid CSV file", async () => {
      const { AnalyticsService } = await import("./analytics");

      const validFile = new File(["col1,col2\nval1,val2"], "test.csv", {
        type: "text/csv",
      });
      expect(AnalyticsService.validateFile(validFile)).toBe(true);
    });

    it("should return false for non-CSV file", async () => {
      const { AnalyticsService } = await import("./analytics");

      const invalidFile = new File(["<html></html>"], "test.html", {
        type: "text/html",
      });
      expect(AnalyticsService.validateFile(invalidFile)).toBe(false);
    });
  });

  describe("validateReport", () => {
    it("should return true for valid report", async () => {
      const { AnalyticsService } = await import("./analytics");

      expect(AnalyticsService.validateReport(validSampleGalacticReport)).toBe(
        true
      );
    });

    it("should return false for invalid report", async () => {
      const { AnalyticsService } = await import("./analytics");

      expect(AnalyticsService.validateReport(invalidSampleGalacticReport)).toBe(
        false
      );
    });
  });

  describe("beautifyDayOfYear", () => {
    it("should transform day of year to human-readable format", async () => {
      const { AnalyticsService } = await import("./analytics");

      const dayOfYear = 100;
      const transformedDate = AnalyticsService.beautifyDayOfYear(dayOfYear);
      expect(transformedDate).toBe("10 апреля");
    });
  });

  describe("transformMetricsResponse", () => {
    it("should transform valid metrics response to valid GalacticReport", async () => {
      const { fileName, date } = validSampleGalacticReport;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...processedSampleGalacticReport } =
        validSampleGalacticReport;

      const { AnalyticsService } = await import("./analytics");

      const report = AnalyticsService.transformMetricsResponse(
        rawValidSampleGalacticReport,
        fileName,
        date
      );

      expect(report).toMatchObject({
        ...processedSampleGalacticReport,
        id: expect.any(String),
      });
    });

    it("should transform invalid metrics response to invalid GalacticReport", async () => {
      const { fileName, date } = invalidSampleGalacticReport;

      const { AnalyticsService } = await import("./analytics");

      const report = AnalyticsService.transformMetricsResponse(
        rawInvalidSampleGalacticReport,
        fileName,
        date
      );

      expect(report.isValid).toBe(false);
    });
  });

  describe("processFile", () => {
    it("should call callback with error if file is invalid", async () => {
      const { AnalyticsService } = await import("./analytics");

      vi.spyOn(AnalyticsService, "validateFile").mockReturnValue(false);

      const fakeFile = new File(["bad data"], "invalid.csv");
      const mockCallback = vi.fn();

      const result = await AnalyticsService.processFile(fakeFile, mockCallback);

      expect(AnalyticsService.validateFile).toHaveBeenCalledWith(fakeFile);
      expect(mockCallback).toHaveBeenCalledWith("Неверный формат файла", null);
      expect(result).toBeNull();
    });
  });
});
