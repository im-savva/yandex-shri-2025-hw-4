import { afterEach, describe, expect, it, vi } from "vitest";
import { create } from "zustand";
import type { GalacticReport } from "../../App.types";
import { createHistorySlice } from "./history";

const createTestStore = () =>
  create<{ history: ReturnType<typeof createHistorySlice>["history"] }>()(
    (...a) => ({
      history: createHistorySlice(...a).history,
    })
  );

describe("HistorySlice", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should initialize with reports from HistoryApi", async () => {
    const { HistoryApi } = await import("../../api/history");
    vi.spyOn(HistoryApi, "getReports").mockReturnValue([
      { id: "1" },
    ] as GalacticReport[]);

    const store = createTestStore();

    expect(store.getState().history.reports).toEqual([{ id: "1" }]);
  });

  it("should upsert report and update reports from HistoryApi", async () => {
    const { HistoryApi } = await import("../../api/history");
    const fakeReport = { id: "abc", fileName: "file.csv" } as GalacticReport;

    const upsertSpy = vi
      .spyOn(HistoryApi, "upsertReport")
      .mockImplementation(() => {});
    const getReportsSpy = vi
      .spyOn(HistoryApi, "getReports")
      .mockReturnValue([fakeReport]);

    const store = createTestStore();
    store.getState().history.upsertReport(fakeReport);

    expect(upsertSpy).toHaveBeenCalledWith(fakeReport);
    expect(getReportsSpy).toHaveBeenCalled();
    expect(store.getState().history.reports).toEqual([fakeReport]);
  });

  it("should remove report and update reports from HistoryApi", async () => {
    const { HistoryApi } = await import("../../api/history");

    const removeSpy = vi
      .spyOn(HistoryApi, "removeReport")
      .mockImplementation(() => {});
    const getReportsSpy = vi
      .spyOn(HistoryApi, "getReports")
      .mockReturnValue([]);

    const store = createTestStore();
    store.getState().history.removeReport("abc");

    expect(removeSpy).toHaveBeenCalledWith("abc");
    expect(getReportsSpy).toHaveBeenCalled();
    expect(store.getState().history.reports).toEqual([]);
  });

  it("should clear reports and set reports to []", async () => {
    const { HistoryApi } = await import("../../api/history");

    const clearSpy = vi
      .spyOn(HistoryApi, "clearReports")
      .mockImplementation(() => {});

    const store = createTestStore();
    store.getState().history.clearReports();

    expect(clearSpy).toHaveBeenCalled();
    expect(store.getState().history.reports).toEqual([]);
  });

  it("should get report by id using HistoryApi", async () => {
    const { HistoryApi } = await import("../../api/history");

    const fakeReport = { id: "abc", fileName: "file.csv" };
    const getByIdSpy = vi
      .spyOn(HistoryApi, "getReportById")
      .mockReturnValue(fakeReport as GalacticReport);

    const store = createTestStore();
    const result = store.getState().history.getReportById("abc");

    expect(getByIdSpy).toHaveBeenCalledWith("abc");
    expect(result).toEqual(fakeReport);
  });
});
