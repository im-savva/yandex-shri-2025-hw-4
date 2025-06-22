import type { ReportsGroupProps } from "./ReportsGroup.types";
import reportsGroupStyles from "./ReportsGroup.module.css";

export const useRepourtsGroup = ({ children }: ReportsGroupProps) => {
  const reportsGroupProps: React.HTMLAttributes<HTMLDivElement> = {
    className: reportsGroupStyles["reports-group"],
  };

  return {
    reportsGroupProps,
    children,
  };
};
