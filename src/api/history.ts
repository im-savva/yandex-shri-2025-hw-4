import type { GalacticReport } from "../App.types";

export const HistoryApi = {
  getReports: (): GalacticReport[] => {
    const reportsJson = localStorage.getItem("reports") || "[]";

    try {
      return JSON.parse(reportsJson);
    } catch {
      return [];
    }
  },

  setReports: (reports: GalacticReport[] = []) => {
    localStorage.setItem("reports", JSON.stringify(reports));
  },

  removeReport: (reportId: string) => {
    const reports = HistoryApi.getReports();
    const updatedReports = reports.filter((report) => report.id !== reportId);
    HistoryApi.setReports(updatedReports);
  },

  clearReports: () => {
    localStorage.removeItem("reports");
  },

  getReportById: (reportId: string) => {
    const reports = HistoryApi.getReports();
    return reports.find((report) => report.id === reportId) || null;
  },

  upsertReport: (updatedReport: GalacticReport) => {
    const reports = HistoryApi.getReports();
    const reportIndex = reports.findIndex(
      (report) => report.id === updatedReport.id
    );

    if (reportIndex !== -1) {
      reports[reportIndex] = updatedReport;
    } else {
      reports.push(updatedReport);
    }

    HistoryApi.setReports(reports);
  },
};
