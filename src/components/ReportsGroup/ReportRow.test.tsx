import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
  invalidSampleGalacticReport,
  validSampleGalacticReport,
} from "../../tests/fixtures/common";
import { ReportRow } from "./ReportRow";

describe("ReportRow Component", () => {
  describe("onClick", () => {
    it("should call onClick with valid report when clicked", async () => {
      const onClick = vi.fn();
      const { getByTestId } = render(
        <ReportRow onClick={onClick} report={validSampleGalacticReport} />
      );

      const row = getByTestId("report-row");
      row.click();

      expect(onClick).toHaveBeenCalledWith(validSampleGalacticReport);
    });

    it("should not call onClick with invalid report when clicked", async () => {
      const onClick = vi.fn();
      const { getByTestId } = render(
        <ReportRow onClick={onClick} report={invalidSampleGalacticReport} />
      );

      const row = getByTestId("report-row");
      row.click();

      expect(onClick).toHaveBeenCalledTimes(0);
    });
  });

  describe("onDelete", () => {
    it("should call onDelete with report when delete button is clicked", async () => {
      const onDelete = vi.fn();
      const { getByRole } = render(
        <ReportRow onDelete={onDelete} report={invalidSampleGalacticReport} />
      );

      const deleteButton = getByRole("button");
      deleteButton.click();

      expect(onDelete).toHaveBeenCalledWith(invalidSampleGalacticReport);
    });
  });
});
