export interface ButtonProps {
  color?: "green" | "yellow" | "black" | "purple" | "orange" | "white" | "red";
  theme?: "filled" | "tinted" | "plain";

  isDisabled?: boolean;
  isLoading?: boolean;

  onClick?: () => void;

  text?: string;
  icon?: React.ReactNode;

  style?: React.CSSProperties;

  title?: string;
}

export interface ButtonGroupProps {
  children: React.ReactNode;

  description?: React.ReactNode;
}
