import { test, expect } from "@playwright/test";
import { TopBarPage } from "./TopBarNavigation.util";

test.describe("TopBar Navigation", () => {
  test("1. Активная ссылка — Главная", async ({ page }) => {
    const topBar = new TopBarPage(page);

    await topBar.goto("/");

    await topBar.checkAllStates({
      active: topBar.linkHome,
      inactive: [topBar.linkGenerate, topBar.linkHistory],
    });

    await topBar.click(topBar.linkGenerate);
    await expect(page).toHaveURL(/\/generate/);
  });

  test("2. Активная ссылка — Генератор", async ({ page }) => {
    const topBar = new TopBarPage(page);

    await topBar.goto("/generate");

    await topBar.checkAllStates({
      active: topBar.linkGenerate,
      inactive: [topBar.linkHome, topBar.linkHistory],
    });

    await topBar.click(topBar.linkHistory);
    await expect(page).toHaveURL(/\/history/);
  });

  test("3. Активная ссылка — История", async ({ page }) => {
    const topBar = new TopBarPage(page);

    await topBar.goto("/history");

    await topBar.checkAllStates({
      active: topBar.linkHistory,
      inactive: [topBar.linkHome, topBar.linkGenerate],
    });

    await topBar.click(topBar.linkHome);
    await expect(page).toHaveURL(/\/$/);
  });

  test("4. Нет активных — Неизвестный URL", async ({ page }) => {
    const topBar = new TopBarPage(page);

    await topBar.goto("/some-unknown-page");

    await topBar.expectInactive(topBar.linkHome);
    await topBar.expectInactive(topBar.linkGenerate);
    await topBar.expectInactive(topBar.linkHistory);
  });
});
