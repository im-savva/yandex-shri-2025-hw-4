import type { ReportsGroupProps } from "./ReportsGroup.types";
import reportsGroupStyles from "./ReportsGroup.module.css";

export const useRepourtsGroup = ({ children }: ReportsGroupProps) => {
  const reportsGroupProps: React.HTMLAttributes<HTMLDivElement> & {
    "data-testid": string;
  } = {
    className: reportsGroupStyles["reports-group"],
    "data-testid": "reports-group",
  };

  return {
    reportsGroupProps,
    children,
  };
};
