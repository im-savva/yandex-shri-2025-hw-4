export interface DropZoneProps {
  state?: "default" | "error" | "fileSelected";

  children?: React.ReactNode;

  isDisabled?: boolean;

  onDrop?: (files: File[]) => void;
  onClick?: () => void;
}
