import classNames from "classnames";
import metricsGridStyles from "./MetricsGrid.module.css";
import type { MetricsGridProps } from "./MetricsGrid.types";

export const useMetricsGrid = ({ children, isShrinked }: MetricsGridProps) => {
  const metricsGridProps: React.HTMLAttributes<HTMLDivElement> & {
    "data-testid": string;
  } = {
    className: classNames(
      metricsGridStyles["metrics-grid"],
      isShrinked && metricsGridStyles["shrinked"]
    ),
    "data-testid": "metrics-grid",
  };

  return { metricsGridProps, children };
};
