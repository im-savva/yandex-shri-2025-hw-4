import { useState } from "react";
import { createPortal } from "react-dom";
import type { GalacticReport } from "../../App.types";
import { Button } from "../../components/Button/Button";
import { ButtonGroup } from "../../components/Button/ButtonGroup";
import { HighlightsGrid } from "../../components/HighlightsGrid/HighlightsGrid";
import { ReportRow } from "../../components/ReportsGroup/ReportRow";
import { ReportsGroup } from "../../components/ReportsGroup/ReportsGroup";
import { useStore } from "../../store/store";
import CancelIcon from "../../components/icons/CancelIcon";

export function HistoryPage() {
  const { reports, removeReport, clearReports } = useStore(
    (state) => state.history
  );

  const redirectToGenerate = () => {
    window.location.href = "/generate";
  };

  const [selectedReport, setSelectedReport] = useState<GalacticReport | null>(
    null
  );

  return (
    <div className="layout-container">
      <div className="layout-group">
        <ReportsGroup>
          {reports.map((report) => (
            <ReportRow
              key={report.id}
              report={report}
              onDelete={({ id }) => removeReport(id)}
              onClick={(report) => setSelectedReport(report)}
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
      {selectedReport &&
        createPortal(
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 1000,
              overflow: "auto",
            }}
            onClick={() => setSelectedReport(null)}
          >
            <div
              style={{
                width: 800,
                margin: "100px auto",
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "8px",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                theme="filled"
                color="black"
                icon={<CancelIcon />}
                onClick={() => setSelectedReport(null)}
                style={{ margin: "0 0 5px auto" }}
              />
              <HighlightsGrid isShrinked metrics={selectedReport} />
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
