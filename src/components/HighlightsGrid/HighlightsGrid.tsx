import type { GalacticReport, GalacticReportKey } from "../../App.types";
import { AnalyticsService } from "../../services/analytics";
import { MetricsGrid } from "../MetricsGrid/MetricsGrid";
import type { MetricsGridProps } from "../MetricsGrid/MetricsGrid.types";
import { MetricsRow } from "../MetricsGrid/MetricsRow";

export const HighlightsGrid = ({
  metrics,
  isShrinked,
}: {
  metrics: GalacticReport;
  isShrinked?: boolean;
} & MetricsGridProps) => {
  return (
    <MetricsGrid isShrinked={isShrinked}>
      {Object.entries(metrics)
        .filter(
          ([label]) =>
            !["id", "less_spent_value", "isValid", "fileName", "date"].includes(
              label
            )
        )
        .map(([label, value]) => {
          return (
            <MetricsRow
              color={isShrinked ? "purple" : "white"}
              key={label}
              label={AnalyticsService.getHighlightLabel(
                label as GalacticReportKey
              )}
              value={
                label.endsWith("at")
                  ? AnalyticsService.beautifyDayOfYear(Number(value))
                  : (value as string)
              }
            />
          );
        })}
    </MetricsGrid>
  );
};
