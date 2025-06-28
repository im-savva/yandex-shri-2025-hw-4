import classNames from "classnames";
import { HighlightsGrid } from "../../../../components/HighlightsGrid/HighlightsGrid";
import { useStore } from "../../../../store/store";
import { EmptyBanner } from "../EmptyBanner/EmptyBanner";

export const Highlights = () => {
  const { currentMetrics, error } = useStore((state) => state.analytics);

  return (
    <div className={classNames("layout-group", "layout-stretch")}>
      {currentMetrics && currentMetrics.isValid && !error ? (
        <HighlightsGrid metrics={currentMetrics} />
      ) : (
        <EmptyBanner />
      )}
    </div>
  );
};
