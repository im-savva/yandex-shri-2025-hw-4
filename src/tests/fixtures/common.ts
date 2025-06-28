import type { GalacticReport, RawGalacticReport } from "../../App.types";

export const rawValidSampleGalacticReport: RawGalacticReport = {
  total_spend_galactic: 719_927_519,
  rows_affected: 287_336,
  less_spent_at: 162,
  big_spent_at: 128,
  less_spent_value: 1_722_419,
  big_spent_value: 2_195_831.5,
  average_spend_galactic: 2_505.52,
  big_spent_civ: "monsters",
  less_spent_civ: "humans",
};

export const rawInvalidSampleGalacticReport: RawGalacticReport = {
  ...rawValidSampleGalacticReport,
  total_spend_galactic: null!,
};

export const validSampleGalacticReport: GalacticReport = {
  ...rawValidSampleGalacticReport,
  big_spent_civ: "monsters",
  less_spent_civ: "humans",
  id: "1",
  fileName: "report1.csv",
  date: "2023-10-01",
  isValid: true,
};

export const invalidSampleGalacticReport: GalacticReport = {
  ...validSampleGalacticReport,
  id: "2",
  total_spend_galactic: null!,
  isValid: false,
};

export const validSampleGalacticReportHighlights = [
  ["общие расходы в галактических кредитах", "719 927 519"],
  ["количество обработанных записей", "287 336"],
  ["день года с минимальными расходами", "11 июня"],
  ["день года с максимальными расходами", "8 мая"],
  ["максимальная сумма расходов за день", "2 195 831,5"],
  ["средние расходы в галактических кредитах", "2 505,52"],
  ["цивилизация с максимальными расходами", "monsters"],
  ["цивилизация с минимальными расходами", "humans"],
];
