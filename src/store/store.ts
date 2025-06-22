import { create } from "zustand";
import { createAnalyticsSlice, type AnalyticsSlice } from "./slices/analytics";
import { createGeneratorSlice, type GeneratorSlice } from "./slices/generator";
import { createHistorySlice, type HistorySlice } from "./slices/history";

export interface StoreState {
  analytics: AnalyticsSlice;
  history: HistorySlice;
  generator: GeneratorSlice;
}

export const useStore = create<StoreState>((...methods) => ({
  ...createAnalyticsSlice(...methods),
  ...createGeneratorSlice(...methods),
  ...createHistorySlice(...methods),
}));
