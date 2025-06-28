import { afterEach, describe, expect, it, vi } from "vitest";
import { create } from "zustand";
import type { GalacticReport } from "../../App.types";
import { createAnalyticsSlice } from "./analytics";

const createTestStore = () =>
  create<{ analytics: ReturnType<typeof createAnalyticsSlice>["analytics"] }>()(
    (...a) => ({
      analytics: createAnalyticsSlice(...a).analytics,
    })
  );

describe("AnalyticsSlice", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should initialize with defaults", () => {
    const store = createTestStore();
    const analytics = store.getState().analytics;
    expect(analytics.file).toBeNull();
    expect(analytics.error).toBeNull();
    expect(analytics.isLoading).toBe(false);
    expect(analytics.isSuccess).toBe(false);
    expect(analytics.currentMetrics).toBeNull();
  });

  it("should set isLoading", () => {
    const store = createTestStore();
    store.getState().analytics.setIsLoading(true);
    expect(store.getState().analytics.isLoading).toBe(true);
  });

  it("should set isSuccess", () => {
    const store = createTestStore();
    store.getState().analytics.setIsSuccess(true);
    expect(store.getState().analytics.isSuccess).toBe(true);
  });

  it("should set error", () => {
    const store = createTestStore();
    store.getState().analytics.setError("Error happened");
    expect(store.getState().analytics.error).toBe("Error happened");
  });

  it("should set currentMetrics", () => {
    const store = createTestStore();
    const metrics = { id: "abc" } as GalacticReport;
    store.getState().analytics.setCurrentMetrics(metrics);
    expect(store.getState().analytics.currentMetrics).toBe(metrics);
  });

  it("should reset file state", () => {
    const store = createTestStore();
    const file = new File(["test"], "test.csv");
    store.getState().analytics.resetFileState(file);

    const state = store.getState().analytics;
    expect(state.file).toBe(file);
    expect(state.error).toBeNull();
    expect(state.isLoading).toBe(false);
    expect(state.isSuccess).toBe(false);
    expect(state.currentMetrics).toBeNull();
  });

  it("should set error on invalid file upload", async () => {
    const store = createTestStore();
    const { AnalyticsService } = await import("../../services/analytics");

    const fakeFile = new File(["bad"], "bad.csv");
    vi.spyOn(AnalyticsService, "validateFile").mockReturnValue(false);

    store.getState().analytics.uploadFile(fakeFile);

    expect(store.getState().analytics.error).toBe(
      "Выберите корректный CSV файл."
    );
  });

  it("should not set error if file is valid", async () => {
    const store = createTestStore();
    const { AnalyticsService } = await import("../../services/analytics");

    const goodFile = new File(["good"], "good.csv");
    vi.spyOn(AnalyticsService, "validateFile").mockReturnValue(true);

    store.getState().analytics.uploadFile(goodFile);

    expect(store.getState().analytics.error).toBeNull();
    expect(store.getState().analytics.file).toBe(goodFile);
  });
});
