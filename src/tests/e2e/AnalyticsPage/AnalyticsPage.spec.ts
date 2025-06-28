import { expect, test } from "@playwright/test";
import { AnalyticsPage, GetStatus } from "./AnalyticsPage.util";

test.describe("Analytics Page", () => {
  test("1. Загрузка валидного CSV через кнопку", async ({ page }) => {
    const analyticsPage = new AnalyticsPage(page);
    const filePath = "src/tests/fixtures/valid.csv";
    const fileName = filePath.split("/").pop()!;

    await analyticsPage.goto();

    await Promise.all(GetStatus.initial(analyticsPage));

    await analyticsPage.uploadFileViaButton(filePath);
    await expect(analyticsPage.dropZone).toContainText(fileName);

    await Promise.all(GetStatus.validFileChosen(analyticsPage));

    await analyticsPage.pressSendButton();

    await Promise.all(GetStatus.validFileProcessing(analyticsPage));

    await Promise.all(GetStatus.validFileProcessed(analyticsPage));

    await analyticsPage.validateLocalStorage(fileName);
  });

  test("2. Загрузка валидного CSV через Drag & Drop", async ({ page }) => {
    const analyticsPage = new AnalyticsPage(page);
    const filePath = "src/tests/fixtures/valid.csv";
    const fileName = filePath.split("/").pop()!;

    await analyticsPage.goto();

    await Promise.all(GetStatus.initial(analyticsPage));

    await analyticsPage.uploadFileViaDropZone(filePath);
    await expect(analyticsPage.dropZone).toContainText(fileName);

    await Promise.all(GetStatus.validFileChosen(analyticsPage));

    await analyticsPage.pressSendButton();

    await Promise.all(GetStatus.validFileProcessing(analyticsPage));
    await Promise.all(GetStatus.validFileProcessed(analyticsPage));

    await analyticsPage.validateLocalStorage(fileName);
  });

  test("3. Загрузка PNG (не CSV) — мгновенная ошибка", async ({ page }) => {
    const analyticsPage = new AnalyticsPage(page);
    const filePath = "src/tests/fixtures/invalid.png";
    const fileName = filePath.split("/").pop()!;

    await analyticsPage.goto();

    await analyticsPage.uploadFileViaButton(filePath);
    await expect(analyticsPage.dropZone).toContainText(fileName);

    await Promise.all(GetStatus.invalidAfterUpload(analyticsPage));

    await analyticsPage.validateLocalStorage(fileName, true);
  });

  test("4. Загрузка пустого или сломанного CSV (валидный формат, но невалидные данные)", async ({
    page,
  }) => {
    const analyticsPage = new AnalyticsPage(page);
    const filePath = "src/tests/fixtures/invalid.csv";
    const fileName = filePath.split("/").pop()!;

    await analyticsPage.goto();

    await analyticsPage.uploadFileViaButton(filePath);
    await analyticsPage.pressSendButton();

    await Promise.all(GetStatus.invalidAfterUpload(analyticsPage));

    await analyticsPage.validateLocalStorage(fileName);
  });

  test("5. Очистка после любых действий", async ({ page }) => {
    const analyticsPage = new AnalyticsPage(page);

    await analyticsPage.goto();

    await Promise.all(GetStatus.initial(analyticsPage));

    await analyticsPage.uploadFileViaButton("src/tests/fixtures/invalid.csv");
    await expect(analyticsPage.dropZone).toContainText("invalid.csv");

    await Promise.all(GetStatus.validFileChosen(analyticsPage));

    await analyticsPage.pressResetButton();

    await Promise.all(GetStatus.initial(analyticsPage));
  });

  test("6. Ошибка при загрузке файла", async ({ page }) => {
    await page.route("http://localhost:3000/aggregate?rows=10000", (route) => {
      route.abort("failed");
    });

    const analyticsPage = new AnalyticsPage(page);
    const filePath = "src/tests/fixtures/valid.csv";
    const fileName = filePath.split("/").pop()!;

    await analyticsPage.goto();

    await analyticsPage.uploadFileViaButton(filePath);

    await analyticsPage.pressSendButton();

    await expect(analyticsPage.uploadStatus).toContainText(/fail/i);
    await Promise.all(GetStatus.invalidAfterUpload(analyticsPage));

    await analyticsPage.validateLocalStorage(fileName, true);
  });
});
