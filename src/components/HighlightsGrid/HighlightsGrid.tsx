import type { GalacticReport, GalacticReportKey } from "../../App.types";
import { AnalyticsService } from "../../services/analytics";
import { MetricsGrid } from "../MetricsGrid/MetricsGrid";
import { MetricsRow } from "../MetricsGrid/MetricsRow";

export const HighlightsGrid = ({
  metrics,
  isShrinked,
}: {
  metrics: GalacticReport;
  isShrinked?: boolean;
}) => {
  return (
    <MetricsGrid isShrinked={isShrinked}>
      {Object.entries(metrics)
        .filter(
          ([label]) => !["id", "less_spent_value", "isValid"].includes(label)
        )
        .map(([label, value]) => {
          return (
            <MetricsRow
              key={label}
              label={AnalyticsService.getHighlightLabel(
                label as GalacticReportKey
              )}
              value={
                label.endsWith("at")
                  ? AnalyticsService.beautifyDayOfYear(Number(value))
                  : value as string
              }
            />
          );
        })}
    </MetricsGrid>
  );
};
