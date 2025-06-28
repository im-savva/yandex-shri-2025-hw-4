import type { StateCreator } from "zustand";
import { HistoryApi } from "../../api/history";
import type { GalacticReport } from "../../App.types";
import type { StoreState } from "../store";

export interface HistorySlice {
  reports: GalacticReport[];

  upsertReport: (report: GalacticReport) => void;
  removeReport: (reportId: string) => void;

  clearReports: () => void;
  getReportById: (reportId: string) => GalacticReport | null;
}

export const createHistorySlice: StateCreator<
  Pick<StoreState, "history">,
  [],
  [],
  Pick<StoreState, "history">
> = (set) => ({
  history: {
    reports: HistoryApi.getReports(),

    upsertReport: (report: GalacticReport) => {
      HistoryApi.upsertReport(report);
      set((state) => ({
        history: {
          ...state.history,
          reports: HistoryApi.getReports(),
        },
      }));
    },
    removeReport: (reportId: string) => {
      HistoryApi.removeReport(reportId);
      set((state) => ({
        history: {
          ...state.history,
          reports: HistoryApi.getReports(),
        },
      }));
    },

    clearReports: () => {
      HistoryApi.clearReports();
      set((state) => ({
        history: {
          ...state.history,
          reports: [],
        },
      }));
    },
    getReportById: (reportId: string) => {
      return HistoryApi.getReportById(reportId);
    },
  },
});
