export interface MetricsGridProps {
  children?: React.ReactNode;

  isShrinked?: boolean;
}

export interface MetricsRowProps {
  value: string | number;
  label: string;

  color?: "white" | "purple";
}
