import type { MetricsGridProps } from "./MetricsGrid.types";
import { useMetricsGrid } from "./useMetricsGrid";

export const MetricsGrid = (props: MetricsGridProps) => {
  const { children, metricsGridProps } = useMetricsGrid(props);

  return <div {...metricsGridProps}>{children}</div>;
};
