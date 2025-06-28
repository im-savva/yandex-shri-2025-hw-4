import { expect, test } from "@playwright/test";
import {
  HistoryPage,
  baseReports,
  setReportsInLocalStorage,
} from "./HistoryPage.util";

test.describe("History Page", () => {
  test.beforeEach(async ({ page }) => {
    await setReportsInLocalStorage(page, baseReports);
  });

  test("1. Загрузка и отображение", async ({ page }) => {
    const historyPage = new HistoryPage(page);

    await historyPage.goto();

    await expect(historyPage.reportRows).toHaveCount(baseReports.length);

    for (let i = 0; i < baseReports.length; i++) {
      const report = baseReports[i];
      const row = historyPage.getReportRowByIndex(i);

      const expectedDate = new Date(report.date).toLocaleDateString("ru-RU");

      await expect(row).toContainText(report.fileName);
      await expect(row).toContainText(expectedDate);
      await expect(row).toContainText("Обработан успешно");
      await expect(row).toContainText("Не удалось обработать");

      const validLabel = row.getByText("Обработан успешно").locator("..");
      const invalidLabel = row.getByText("Не удалось обработать").locator("..");

      await expect(validLabel).toHaveCSS(
        "opacity",
        report.isValid ? "1" : "0.5"
      );
      await expect(invalidLabel).toHaveCSS(
        "opacity",
        report.isValid ? "0.5" : "1"
      );
    }
  });

  test("2. Клик по успешному отчёту", async ({ page }) => {
    const historyPage = new HistoryPage(page);

    await historyPage.goto();

    const row = historyPage.getReportRowByIndex(0);
    await row.click();

    await expect(historyPage.dialog).toBeVisible();
    await historyPage.validateHighlights();

    await historyPage.closeDialogButton.click();
    await expect(historyPage.dialog).toHaveCount(0);
  });

  test("3. Клик по неуспешному отчёту", async ({ page }) => {
    const historyPage = new HistoryPage(page);

    await historyPage.goto();

    const row = historyPage.getReportRowByIndex(1);
    await row.click();

    await expect(historyPage.dialog).toHaveCount(0);
  });

  test("4. Удаление одного отчёта", async ({ page }) => {
    const historyPage = new HistoryPage(page);

    await historyPage.goto();

    const row = historyPage.getReportRowByIndex(0);

    await historyPage.getDeleteButtonByRow(row).click();

    await expect(historyPage.reportRows).toHaveCount(baseReports.length - 1);

    const reportsInStorage = await historyPage.getReportsFromLocalStorage();
    expect(reportsInStorage).toHaveLength(baseReports.length - 1);
    expect(
      reportsInStorage.find((r) => r.id === baseReports[0].id)
    ).toBeFalsy();
  });

  test("5. Очистка всех", async ({ page }) => {
    const historyPage = new HistoryPage(page);

    await historyPage.goto();

    await historyPage.clearAllButton.click();

    await expect(historyPage.reportRows).toHaveCount(0);

    const reportsInStorage = await historyPage.getReportsFromLocalStorage();
    expect(reportsInStorage).toHaveLength(0);
  });

  test("6. Переход на генератор", async ({ page }) => {
    const historyPage = new HistoryPage(page);

    await historyPage.goto();

    await Promise.all([
      page.waitForURL("/generate"),
      historyPage.generateMoreButton.click(),
    ]);

    await page.waitForTimeout(5000);
  });
});
