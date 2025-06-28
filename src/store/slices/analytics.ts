import type { StateCreator } from "zustand";
import type { GalacticReport } from "../../App.types";
import { AnalyticsService } from "../../services/analytics";
import type { StoreState } from "../store";

export interface AnalyticsSlice {
  file: File | null;

  resetFileState: (file?: File | null) => void;
  uploadFile: (file: File) => void;

  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;

  isSuccess: boolean;
  setIsSuccess: (isSuccess: boolean) => void;

  error: string | null;
  setError: (error: string | null) => void;

  currentMetrics: GalacticReport | null;
  setCurrentMetrics: (metrics: GalacticReport | null) => void;
}

export const createAnalyticsSlice: StateCreator<
  Pick<StoreState, "analytics">,
  [],
  [],
  Pick<StoreState, "analytics">
> = (set, get) => ({
  analytics: {
    file: null,

    resetFileState: (file: File | null = null) => {
      set((state) => ({
        analytics: {
          ...state.analytics,
          file,
          error: null,
          currentMetrics: null,
          isLoading: false,
          isSuccess: false,
        },
      }));
    },
    uploadFile: (file: File) => {
      get().analytics.resetFileState(file);

      if (AnalyticsService.validateFile(file)) {
        return;
      }

      set((state) => ({
        analytics: {
          ...state.analytics,
          error: "Выберите корректный CSV файл.",
        },
      }));
    },

    isLoading: false,
    setIsLoading: (isLoading: boolean) => {
      set((state) => ({
        analytics: {
          ...state.analytics,
          isLoading,
        },
      }));
    },

    isSuccess: false,
    setIsSuccess: (isSuccess: boolean) => {
      set((state) => ({
        analytics: {
          ...state.analytics,
          isSuccess,
        },
      }));
    },

    error: null,
    setError: (error: string | null) => {
      set((state) => ({
        analytics: {
          ...state.analytics,
          error,
        },
      }));
    },

    currentMetrics: null,
    setCurrentMetrics: (metrics: GalacticReport | null) => {
      set((state) => ({
        analytics: {
          ...state.analytics,
          currentMetrics: metrics,
        },
      }));
    },
  },
});
