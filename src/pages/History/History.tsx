import { ReportRow } from "../../components/ReportsGroup/ReportRow";
import { ReportsGroup } from "../../components/ReportsGroup/ReportsGroup";
import { useStore } from "../../store/store";

export function HistoryPage() {
  const { reports } = useStore((state) => state.history);

  return (
    <div className="layout-container">
      <div className="layout-group">
        <ReportsGroup>
          {reports.map((report) => (
            <ReportRow key={report.id} report={report} />
          ))}
        </ReportsGroup>
      </div>
    </div>
  );
}
