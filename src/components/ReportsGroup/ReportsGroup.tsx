import type { ReportsGroupProps } from "./ReportsGroup.types";
import { useRepourtsGroup } from "./useReportsGroup";

export const ReportsGroup = ({ children }: ReportsGroupProps) => {
  const { reportsGroupProps } = useRepourtsGroup({ children });

  return <div {...reportsGroupProps}>{children}</div>;
};
