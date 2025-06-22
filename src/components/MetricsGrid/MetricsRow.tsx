import type { MetricsRowProps } from "./MetricsGrid.types";
import { useMetricsRow } from "./useMetricsRow";

export const MetricsRow = (props: MetricsRowProps) => {
  const { metricsRowProps, metricsValueProps, metricsLabelProps } =
    useMetricsRow(props);

  return (
    <div {...metricsRowProps}>
      <div {...metricsValueProps} />
      <div {...metricsLabelProps} />
    </div>
  );
};
