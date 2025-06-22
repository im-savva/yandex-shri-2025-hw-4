import type { DropZoneProps } from "./DropZone.types";
import { useDropZone } from "./useDropZone";

export const DropZone = (props: DropZoneProps) => {
  const { dropZoneProps, children } = useDropZone(props);

  return <div {...dropZoneProps}>{children}</div>;
};
