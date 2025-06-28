import { test } from "@playwright/test";
import { GeneratePage, GetStatus } from "./GeneratePage.util";

test.describe("Generate Page", () => {
  test("1. Успешная генерация файла", async ({ page }) => {
    const generatePage = new GeneratePage(page);

    await generatePage.goto();

    await Promise.all(GetStatus.initial(generatePage));

    await generatePage.pressGenerateButton();

    await Promise.all(GetStatus.generating(generatePage));

    await Promise.all(GetStatus.generated(generatePage));
  });

  test("2. Ошибка сети при генерации", async ({ page }) => {
    const generatePage = new GeneratePage(page);

    await page.route(
      "http://localhost:3000/report?size=0.001&withErrors=on&maxSpend=5000",
      async (route) => {
        await new Promise((r) => setTimeout(r, 100));
        route.abort("failed");
      }
    );

    await generatePage.goto();

    await Promise.all(GetStatus.initial(generatePage));

    await generatePage.pressGenerateButton();

    await Promise.all(GetStatus.generating(generatePage));

    await Promise.all(GetStatus.failed(generatePage));
  });

  test("3. Очистка состояния после генерации", async ({ page }) => {
    const generatePage = new GeneratePage(page);

    await generatePage.goto();

    await Promise.all(GetStatus.initial(generatePage));

    await generatePage.pressGenerateButton();

    await Promise.all(GetStatus.generating(generatePage));
    await Promise.all(GetStatus.generated(generatePage));

    await generatePage.pressResetButton();

    await Promise.all(GetStatus.initial(generatePage));
  });
});
