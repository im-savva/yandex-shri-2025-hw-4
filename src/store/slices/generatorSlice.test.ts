import { afterEach, describe, expect, it } from "vitest";
import { create } from "zustand";
import { createGeneratorSlice, type GeneratorSlice } from "./generator";

const createTestStore = () =>
  create<{ generator: GeneratorSlice }>()((...a) => ({
    generator: createGeneratorSlice(...a).generator,
  }));

describe("GeneratorSlice", () => {
  afterEach(() => {
    const store = createTestStore();
    store.getState().generator.resetFileState();
  });

  it("should initialize with default state", () => {
    const store = createTestStore();
    expect(store.getState().generator.isLoading).toBe(false);
    expect(store.getState().generator.error).toBeNull();
  });

  it("should set isLoading", () => {
    const store = createTestStore();
    store.getState().generator.setIsLoading(true);
    expect(store.getState().generator.isLoading).toBe(true);
  });

  it("should set error", () => {
    const store = createTestStore();
    store.getState().generator.setError("Something went wrong");
    expect(store.getState().generator.error).toBe("Something went wrong");
  });

  it("should reset state", () => {
    const store = createTestStore();
    store.getState().generator.setIsLoading(true);
    store.getState().generator.setError("Oops");

    store.getState().generator.resetFileState();

    expect(store.getState().generator.isLoading).toBe(false);
    expect(store.getState().generator.error).toBeNull();
  });
});
