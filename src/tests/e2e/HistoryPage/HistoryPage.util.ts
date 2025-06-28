import { expect, type Locator, type Page } from "@playwright/test";
import type { GalacticReport } from "../../../App.types";
import {
  invalidSampleGalacticReport,
  validSampleGalacticReport,
  validSampleGalacticReportHighlights,
} from "../../fixtures/common";

export class HistoryPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  goto() {
    return this.page.goto("/history");
  }

  get reportRows(): Locator {
    return this.page.locator('[data-testid="report-row"]');
  }

  get clearAllButton(): Locator {
    return this.page.getByRole("button", { name: "Очистить все" });
  }

  get generateMoreButton(): Locator {
    return this.page.getByRole("button", { name: "Сгенерировать больше" });
  }

  get dialog(): Locator {
    return this.page.locator('[data-testid="metrics-grid"]');
  }

  get closeDialogButton(): Locator {
    return this.page.getByTitle("Закрыть");
  }

  getReportRowByIndex(index: number): Locator {
    return this.reportRows.nth(index);
  }

  getDeleteButtonByRow(row: Locator): Locator {
    return row.getByTitle("Удалить");
  }

  async getReportsFromLocalStorage(): Promise<GalacticReport[]> {
    return await this.page.evaluate(() => {
      return JSON.parse(localStorage.getItem("reports") || "[]");
    });
  }

  async validateHighlights() {
    const rows = this.page.locator('[data-testid="metrics-row"]');
    await expect(rows).toHaveCount(validSampleGalacticReportHighlights.length);

    for (let i = 0; i < validSampleGalacticReportHighlights.length; i++) {
      const row = rows.nth(i);
      const value = row.locator("div").first();
      const label = row.locator("div").last();

      await expect(label).toHaveText(validSampleGalacticReportHighlights[i][0]);
      await expect(value).toHaveText(validSampleGalacticReportHighlights[i][1]);
    }
  }
}

export const baseReports: GalacticReport[] = [
  validSampleGalacticReport,
  invalidSampleGalacticReport,
];

export async function setReportsInLocalStorage(
  page: Page,
  reports: GalacticReport[]
) {
  await page.addInitScript((r) => {
    localStorage.setItem("reports", JSON.stringify(r));
  }, reports);
}
