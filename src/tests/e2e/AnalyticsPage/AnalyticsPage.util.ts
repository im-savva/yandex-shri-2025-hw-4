import { expect, type Page } from "@playwright/test";
import { readFile } from "fs/promises";
import type { GalacticReport } from "../../../App.types";
import type { WaitForComponentOptions } from "../../common.types";
import { validSampleGalacticReportHighlights } from "../../fixtures/common";

export class AnalyticsPage {
  public readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public get uploadButton() {
    return this.page.getByRole("button", { name: "Загрузить файл" });
  }

  public get sendButton() {
    return this.page.getByRole("button", { name: "Отправить" });
  }

  public get resetButton() {
    return this.page.getByTitle("Сбросить");
  }

  public get dropZone() {
    return this.page.locator("[data-testid='drop-zone']");
  }

  public get highlights() {
    return this.page.locator("[data-testid='metrics-grid']");
  }

  public get uploadStatus() {
    return this.page.locator("[data-testid='upload-status']");
  }

  public get animatedLoader() {
    return this.page.locator("[data-testid='animated-loader']");
  }

  public goto() {
    return this.page.goto("/");
  }

  public pressSendButton() {
    return this.sendButton.click();
  }

  public pressResetButton() {
    return this.resetButton.click();
  }

  public async isSendButtonActive() {
    const isEnabled = await this.sendButton.isEnabled();
    const isVisible = await this.sendButton.isVisible();

    return isEnabled && isVisible;
  }

  public waitForSendButton(state: WaitForComponentOptions) {
    return this.sendButton.waitFor({
      state,
    });
  }

  public waitForLoader(state: WaitForComponentOptions) {
    return this.animatedLoader.waitFor({
      state,
    });
  }

  public waitForResetButton(state: WaitForComponentOptions) {
    return this.resetButton.waitFor({
      state,
    });
  }

  public waitForHighlights(state: WaitForComponentOptions) {
    return this.highlights.waitFor({
      state,
    });
  }

  public getUploadStatus() {
    return this.uploadStatus.textContent();
  }

  public expectUploadStatusToContain(text: string, not: boolean = false) {
    return not
      ? expect(this.uploadStatus).not.toHaveText(new RegExp(text, "i"))
      : expect(this.uploadStatus).toHaveText(new RegExp(text, "i"));
  }

  public async uploadFileViaButton(filePath: string) {
    const [fileChooser] = await Promise.all([
      this.page.waitForEvent("filechooser"),
      this.uploadButton.click(),
    ]);
    await fileChooser.setFiles(filePath);
  }

  public async uploadFileViaDropZone(filePath: string) {
    const fileName = filePath.split("/").pop()!;
    const fileContent = await readFile(filePath, "utf8");

    await this.page.evaluate(
      ({ selector, fileName, fileContent }) => {
        const file = new File([fileContent], fileName, { type: "text/csv" });

        const dt = new DataTransfer();
        dt.items.add(file);

        const dropEvent = new DragEvent("drop", {
          bubbles: true,
          cancelable: true,
        });

        Object.defineProperty(dropEvent, "dataTransfer", {
          value: dt,
        });

        const el = document.querySelector(selector);
        el?.dispatchEvent(dropEvent);
      },
      {
        selector: '[data-testid="drop-zone"]',
        fileName,
        fileContent,
      }
    );
  }

  public async validateHightlights() {
    const rows = this.page.locator('[data-testid="metrics-row"]');
    await expect(rows).toHaveCount(8);

    for (let i = 0; i < validSampleGalacticReportHighlights.length; i++) {
      const row = rows.nth(i);

      const children = row.locator("div");
      const value = children.nth(0);
      const label = children.nth(1);

      await expect(label).toHaveText(validSampleGalacticReportHighlights[i][0]);
      await expect(value).toHaveText(validSampleGalacticReportHighlights[i][1]);
    }
  }

  public async validateLocalStorage(fileName: string, not: boolean = false) {
    const reports = await this.page.evaluate(() => {
      return JSON.parse(localStorage.getItem("reports") ?? "[]");
    });

    const expectation = expect(
      reports.some((r: GalacticReport) => r.fileName === fileName)
    );

    if (not) {
      expectation.toBeFalsy();
    } else {
      expectation.toBeTruthy();
    }
  }
}

export const GetStatus = {
  initial: (analyticsPage: AnalyticsPage) => [
    async () => expect(await analyticsPage.isSendButtonActive()).toBeFalsy(),

    analyticsPage.waitForLoader("hidden"),
    analyticsPage.waitForHighlights("hidden"),
    analyticsPage.waitForResetButton("hidden"),

    analyticsPage.expectUploadStatusToContain("перетащите файл сюда"),
  ],

  validFileChosen: (analyticsPage: AnalyticsPage) => [
    expect(analyticsPage.isSendButtonActive()).toBeTruthy(),

    analyticsPage.waitForLoader("hidden"),
    analyticsPage.waitForHighlights("hidden"),
    analyticsPage.waitForResetButton("visible"),

    analyticsPage.expectUploadStatusToContain("файл загружен"),
  ],

  validFileProcessing: (analyticsPage: AnalyticsPage) => [
    analyticsPage.waitForLoader("visible"),
    analyticsPage.waitForHighlights("visible"),
    analyticsPage.waitForResetButton("hidden"),

    analyticsPage.expectUploadStatusToContain("идёт парсинг"),
  ],

  validFileProcessed: (analyticsPage: AnalyticsPage) => [
    analyticsPage.waitForLoader("hidden"),
    analyticsPage.waitForHighlights("visible"),
    analyticsPage.waitForResetButton("visible"),

    analyticsPage.expectUploadStatusToContain("готово"),

    analyticsPage.validateHightlights(),
  ],

  invalidAfterUpload: (analyticsPage: AnalyticsPage) => [
    analyticsPage.waitForLoader("hidden"),
    analyticsPage.waitForHighlights("hidden"),
    analyticsPage.waitForResetButton("visible"),

    analyticsPage.expectUploadStatusToContain("готово", true),
  ],
};
