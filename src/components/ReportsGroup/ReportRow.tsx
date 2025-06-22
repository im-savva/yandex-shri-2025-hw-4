import { Button } from "../Button/Button";
import FileIcon from "../icons/FileIcon";
import SmileHappyIcon from "../icons/SmileHappyIcon";
import SmileSadIcon from "../icons/SmileSadIcon";
import type { ReportRowProps } from "./ReportsGroup.types";
import { useReportRow } from "./useReportRow";

export const ReportRow = (props: ReportRowProps) => {
  const { reportRowProps, reportInfoProps, deleteButtonProps, report } =
    useReportRow(props);

  return (
    <div {...reportRowProps}>
      <div {...reportInfoProps}>
        <div>
          <FileIcon />
          <span>{report.fileName}</span>
        </div>
        <div>{new Date(report.date).toLocaleDateString("ru-RU")}</div>
        <div style={report.isValid ? { opacity: 1 } : { opacity: 0.5 }}>
          <span>Обработан успешно</span> <SmileHappyIcon />
        </div>
        <div style={!report.isValid ? { opacity: 1 } : { opacity: 0.5 }}>
          <span>Не удалось обработать</span> <SmileSadIcon />
        </div>
      </div>
      <Button {...deleteButtonProps} />
    </div>
  );
};
