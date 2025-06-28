import { expect, type Page } from "@playwright/test";

export class GeneratePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public get generateButton() {
    return this.page.getByRole("button", {
      name: /начать генерацию|done!|ошибка/i,
    });
  }

  public get loader() {
    return this.page.locator('[data-testid="animated-loader"]');
  }

  public get generateStatus() {
    return this.page.locator('[data-testid="generate-status"]');
  }

  public get resetButton() {
    return this.page.getByTitle("Сбросить");
  }

  public goto() {
    return this.page.goto("/generate");
  }

  public pressGenerateButton() {
    return this.generateButton.click();
  }

  public pressResetButton() {
    return this.resetButton.click();
  }

  public async waitForLoaderVisible() {
    await expect(this.loader).toBeVisible();
  }

  public async waitForLoaderHidden() {
    await expect(this.loader).toBeHidden();
  }

  public async waitForStatusContains(text: string) {
    await expect(this.generateStatus).toContainText(new RegExp(text, "i"));
  }

  public async waitForButtonText(text: string) {
    await expect(this.generateButton).toHaveText(new RegExp(text, "i"));
  }

  public async expectResetVisible() {
    await expect(this.resetButton).toBeVisible();
  }

  public async expectResetHidden() {
    await expect(this.resetButton).toBeHidden();
  }
}

export const GetStatus = {
  initial: (generatePage: GeneratePage) => [
    generatePage.waitForLoaderHidden(),
    generatePage.waitForStatusContains(""),
    generatePage.expectResetHidden(),
    generatePage.waitForButtonText("начать генерацию"),
  ],

  generating: (generatePage: GeneratePage) => [
    generatePage.waitForLoaderVisible(),
    generatePage.waitForStatusContains("идёт процесс генерации"),
    generatePage.expectResetHidden(),
  ],

  generated: (generatePage: GeneratePage) => [
    generatePage.waitForLoaderHidden(),
    generatePage.waitForStatusContains("файл сгенерирован"),
    generatePage.expectResetVisible(),
    generatePage.waitForButtonText("done!"),
  ],

  failed: (generatePage: GeneratePage) => [
    generatePage.waitForLoaderHidden(),
    generatePage.waitForStatusContains("Не удалось"),
    generatePage.expectResetVisible(),
    generatePage.waitForButtonText("ошибка"),
  ],
};
