import classNames from "classnames";
import { HighlightsGrid } from "../../../../components/HighlightsGrid/HighlightsGrid";
import { useStore } from "../../../../store/store";
import { EmptyBanner } from "../EmptyBanner/EmptyBanner";

export const Highlights = () => {
  const { currentMetrics } = useStore((state) => state.analytics);

  return (
    <div className={classNames("layout-group", "layout-stretch")}>
      {currentMetrics && currentMetrics.isValid ? (
        <HighlightsGrid metrics={currentMetrics} />
      ) : (
        <EmptyBanner />
      )}
    </div>
  );
};
