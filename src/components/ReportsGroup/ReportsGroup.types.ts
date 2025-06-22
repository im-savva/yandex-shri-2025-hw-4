import type { GalacticReport } from "../../App.types";

export interface ReportsGroupProps {
  children?: React.ReactNode;
}

export interface ReportRowProps {
  report: GalacticReport;

  onClick?: (report: GalacticReport) => void;
  onDelete?: (report: GalacticReport) => void;
}
