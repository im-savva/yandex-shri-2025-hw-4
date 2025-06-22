import type { ButtonProps } from "../Button/Button.types";
import type { ReportRowProps } from "./ReportsGroup.types";
import reportsGroupStyles from "./ReportsGroup.module.css";
import TrashIcon from "../icons/TrashIcon";

export const useReportRow = ({ report, onClick, onDelete }: ReportRowProps) => {
  const reportRowProps: React.ButtonHTMLAttributes<HTMLDivElement> = {
    className: reportsGroupStyles["report-row"],
    onClick: report.isValid ? () => onClick?.(report) : undefined,
    disabled: !report.isValid,
  };

  const reportInfoProps: React.HTMLAttributes<HTMLDivElement> = {
    className: reportsGroupStyles["report-info"],
  };

  const deleteButtonProps: ButtonProps = {
    onClick: () => onDelete?.(report),

    color: "red",
    theme: "plain",

    icon: <TrashIcon />,

    style: { flexShrink: 0, width: "55px" },
  };

  return {
    reportRowProps,
    reportInfoProps,

    deleteButtonProps,

    report,
  };
};
