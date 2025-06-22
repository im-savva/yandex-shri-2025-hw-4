import classNames from "classnames";
import React from "react";
import dropZoneStyles from "./DropZone.module.css";
import type { DropZoneProps } from "./DropZone.types";

export const useDropZone = ({
  state = "default",

  children,

  isDisabled,

  onDrop,
  onClick,
}: DropZoneProps) => {
  const dropZoneRef = React.useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = React.useState<boolean>(false);

  React.useEffect(() => {
    const handleDrop = (event: DragEvent) => {
      setIsDragging(false);

      if (isDisabled) return;

      event.preventDefault();

      if (onDrop && event.dataTransfer?.files) {
        const files = Array.from(event.dataTransfer.files);
        onDrop(files);
      }
    };

    const handleDragOver = (event: DragEvent) => {
      if (isDisabled) return;

      setIsDragging(true);
      event.preventDefault();
    };

    const handleDragLeave = (event: DragEvent) => {
      setIsDragging(false);
      event.preventDefault();
    };

    const dropZoneElement = dropZoneRef.current;

    if (dropZoneElement) {
      dropZoneElement.addEventListener("drop", handleDrop);
      dropZoneElement.addEventListener("dragover", handleDragOver);
      dropZoneElement.addEventListener("dragleave", handleDragLeave);
    }

    return () => {
      if (dropZoneElement) {
        dropZoneElement.removeEventListener("drop", handleDrop);
        dropZoneElement.removeEventListener("dragover", handleDragOver);
        dropZoneElement.removeEventListener("dragleave", handleDragLeave);
      }
    };
  });

  const dropZoneProps: React.ButtonHTMLAttributes<HTMLDivElement> & {
    ref: React.Ref<HTMLDivElement>;
  } = {
    ref: dropZoneRef,
    className: classNames(
      dropZoneStyles["drop-zone"],
      dropZoneStyles[`state-${state}`],
      isDragging && dropZoneStyles["dragging"]
    ),
    onClick,
    disabled: isDisabled,
  };

  return { dropZoneProps, children };
};
