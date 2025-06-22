import classNames from "classnames";
import metricsGridStyles from "./MetricsGrid.module.css";
import type { MetricsGridProps } from "./MetricsGrid.types";

export const useMetricsGrid = ({ children, isShrinked }: MetricsGridProps) => {
  const metricsGridProps: React.HTMLAttributes<HTMLDivElement> = {
    className: classNames(
      metricsGridStyles["metrics-grid"],
      isShrinked && metricsGridStyles["shrinked"]
    ),
  };

  return { metricsGridProps, children };
};
