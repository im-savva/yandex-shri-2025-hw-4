import { Button } from "../../components/Button/Button";
import { ButtonGroup } from "../../components/Button/ButtonGroup";
import { ReportRow } from "../../components/ReportsGroup/ReportRow";
import { ReportsGroup } from "../../components/ReportsGroup/ReportsGroup";
import { useStore } from "../../store/store";

export function HistoryPage() {
  const { reports, removeReport, clearReports } = useStore(
    (state) => state.history
  );

  const redirectToGenerate = () => {
    window.location.href = "/generate";
  };

  return (
    <div className="layout-container">
      <div className="layout-group">
        <ReportsGroup>
          {reports.map((report) => (
            <ReportRow
              key={report.id}
              report={report}
              onDelete={({ id }) => removeReport(id)}
            />
          ))}
        </ReportsGroup>
        <ButtonGroup>
          <Button
            theme="filled"
            color="green"
            text="Сгенерировать больше"
            onClick={redirectToGenerate}
          />
          {reports.length > 0 && (
            <Button
              theme="filled"
              color="black"
              text="Очистить все"
              onClick={clearReports}
            />
          )}
        </ButtonGroup>
      </div>
    </div>
  );
}
