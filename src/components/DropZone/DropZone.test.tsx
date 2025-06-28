import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { DropZone } from "./DropZone";

describe("DropZone Component", () => {
  describe("isDisabled", () => {
    it("should render drop zone as disabled when isDisabled is true", () => {
      const { getByTestId } = render(<DropZone isDisabled />);

      expect(getByTestId("drop-zone")).toHaveAttribute("disabled");
    });

    it("should render drop zone as enabled when isDisabled is false", () => {
      const { getByTestId } = render(<DropZone isDisabled={false} />);

      expect(getByTestId("drop-zone")).not.toHaveAttribute("disabled");
    });
  });

  describe("onDrop", () => {
    it("should call onDrop with files when files are dropped", () => {
      const mockOnDrop = vi.fn();
      const { getByTestId } = render(<DropZone onDrop={mockOnDrop} />);

      const dropZone = getByTestId("drop-zone");
      const file = new File(["test content"], "test.txt");

      const dropEvent = new Event("drop", { bubbles: true });
      Object.defineProperty(dropEvent, "dataTransfer", {
        value: {
          files: [file],
          items: [
            {
              kind: "file",
              type: file.type,
              getAsFile: () => file,
            },
          ],
        },
      });

      dropZone.dispatchEvent(dropEvent);

      expect(mockOnDrop).toHaveBeenCalledWith([file]);
    });

    it("should not call onDrop when isDisabled is true", () => {
      const mockOnDrop = vi.fn();
      const { getByTestId } = render(
        <DropZone isDisabled onDrop={mockOnDrop} />
      );

      const dropZone = getByTestId("drop-zone");
      const file = new File(["test content"], "test.txt");

      const dropEvent = new Event("drop", { bubbles: true });
      Object.defineProperty(dropEvent, "dataTransfer", {
        value: {
          files: [file],
          items: [
            {
              kind: "file",
              type: file.type,
              getAsFile: () => file,
            },
          ],
        },
      });

      dropZone.dispatchEvent(dropEvent);

      expect(mockOnDrop).not.toHaveBeenCalled();
    });
  });
});
