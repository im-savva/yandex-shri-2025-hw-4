import classNames from "classnames";
import metricsGridStyles from "./MetricsGrid.module.css";
import type { MetricsRowProps } from "./MetricsGrid.types";

const beautifyValue = (value: number | string) => {
  if (typeof value === "number") {
    return value.toLocaleString("ru-RU", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
  }

  return value;
};

export const useMetricsRow = ({
  value,
  label,
  color = "white",
}: MetricsRowProps) => {
  const metricsValueProps: React.HTMLAttributes<HTMLDivElement> = {
    className: metricsGridStyles["value"],
    children: beautifyValue(value),
  };

  const metricsLabelProps: React.HTMLAttributes<HTMLDivElement> = {
    className: metricsGridStyles["label"],
    children: label,
  };

  const metricsRowProps: React.HTMLAttributes<HTMLDivElement> & {
    "data-testid": string;
  } = {
    className: classNames(
      metricsGridStyles["metrics-row"],
      metricsGridStyles[`color-${color}`]
    ),
    "data-testid": "metrics-row",
  };

  return { metricsRowProps, metricsValueProps, metricsLabelProps };
};
