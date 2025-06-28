import { AnalyticsApi } from "../api/analytics";
import type {
  Civilization,
  GalacticReport,
  GalacticReportKey,
  RawGalacticReport,
} from "../App.types";

export const HIGHLIGHT_TITLES: Record<GalacticReportKey, string> = {
  total_spend_galactic: "общие расходы в галактических кредитах",
  rows_affected: "количество обработанных записей",
  less_spent_at: "день года с минимальными расходами",
  big_spent_at: "день года с максимальными расходами",
  big_spent_value: "максимальная сумма расходов за день",
  average_spend_galactic: "средние расходы в галактических кредитах",
  big_spent_civ: "цивилизация с максимальными расходами",
  less_spent_civ: "цивилизация с минимальными расходами",
};

export const validHighlightKeys = [
  ...Object.keys(HIGHLIGHT_TITLES),
  "less_spent_value",
];

export const AnalyticsService = {
  generateId(): string {
    return Math.random().toString(36).slice(2, 10);
  },

  validateFile: (file: File): boolean => {
    return file.name.endsWith(".csv");
  },

  validateReport: (report: GalacticReport | null): boolean => {
    if (!report) return false;

    if (
      Object.values(report).some(
        (value) => value === null || value === undefined
      )
    ) {
      return false;
    }
    return true;
  },

  getHighlightLabel: (labelKey: GalacticReportKey): string => {
    return HIGHLIGHT_TITLES[labelKey];
  },

  beautifyDayOfYear: (day: number): string => {
    const date = new Date(Date.UTC(2023, 0, day));
    const monthsGenitive = [
      "января",
      "февраля",
      "марта",
      "апреля",
      "мая",
      "июня",
      "июля",
      "августа",
      "сентября",
      "октября",
      "ноября",
      "декабря",
    ];
    return `${date.getUTCDate()} ${monthsGenitive[date.getUTCMonth()]}`;
  },

  transformMetricsResponse: (
    metrics: RawGalacticReport,
    fileName: string,
    date: string,
    id: string = AnalyticsService.generateId()
  ): GalacticReport => {
    const filteredResponse = Object.fromEntries(
      Object.entries(metrics).filter(([key]) => {
        return validHighlightKeys.includes(key);
      })
    ) as RawGalacticReport;

    const report: GalacticReport = {
      ...filteredResponse,

      id,

      fileName,
      date,

      big_spent_civ: metrics.big_spent_civ as Civilization,
      less_spent_civ: metrics.less_spent_civ as Civilization,

      isValid: true,
    };

    return {
      ...report,
      isValid: AnalyticsService.validateReport(report),
    };
  },

  processFile: async (
    file: File,
    callback: (error: string | null, metrics: GalacticReport | null) => void
  ): Promise<GalacticReport | null> => {
    if (!AnalyticsService.validateFile(file)) {
      callback("Неверный формат файла", null);
      return null;
    }

    const fileName = file.name;
    const date = new Date().toISOString();
    const id = AnalyticsService.generateId();

    const intialReport: RawGalacticReport = {
      total_spend_galactic: 0,
      rows_affected: 0,
      less_spent_at: 0,
      big_spent_at: 0,
      less_spent_value: 0,
      big_spent_value: 0,
      average_spend_galactic: 0,
      big_spent_civ: "humans",
      less_spent_civ: "humans",
    };

    callback(
      null,
      AnalyticsService.transformMetricsResponse(
        intialReport,
        fileName,
        date,
        id
      )
    );

    let result: GalacticReport | null = null;
    let chunk = "";

    const bodyStream = await AnalyticsApi.uploadFile(file);
    const decoder = new TextDecoder("utf-8");

    while (true) {
      const { done, value } = await bodyStream.read();
      if (done) break;

      chunk += decoder.decode(value, { stream: true });

      if (chunk.includes("\n")) {
        let data = "";

        while (chunk.includes("\n")) {
          const index = chunk.indexOf("\n");
          if (index === -1) break;
          data += chunk.slice(0, index + 1);
          chunk = chunk.slice(index + 1);
        }

        data.split("\n").forEach((line) => {
          if (line.trim()) {
            const jsonData = JSON.parse(line);

            const metrics = AnalyticsService.transformMetricsResponse(
              jsonData as RawGalacticReport,
              fileName,
              date,
              id
            );

            callback(null, metrics);

            result = metrics;
          }
        });
      }
    }

    return result;
  },
};
