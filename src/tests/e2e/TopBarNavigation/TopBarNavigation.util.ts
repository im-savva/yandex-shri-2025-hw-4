import { expect, type Locator, type Page } from "@playwright/test";

export class TopBarPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get linkHome(): Locator {
    return this.page.getByRole("link", { name: "CSV Аналитик" });
  }

  get linkGenerate(): Locator {
    return this.page.getByRole("link", { name: "CSV Генератор" });
  }

  get linkHistory(): Locator {
    return this.page.getByRole("link", { name: "История" });
  }

  async goto(path: string) {
    await this.page.goto(path);
  }

  async expectActive(link: Locator) {
    await expect(link).toHaveClass(/active/i);
  }

  async expectInactive(link: Locator) {
    await expect(link).not.toHaveClass(/active/i);
  }

  async click(link: Locator) {
    await link.click();
  }

  async checkAllStates({
    active,
    inactive,
  }: {
    active: Locator;
    inactive: Locator[];
  }) {
    await this.expectActive(active);
    for (const link of inactive) {
      await this.expectInactive(link);
    }
  }
}
