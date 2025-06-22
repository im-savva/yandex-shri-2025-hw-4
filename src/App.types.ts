export type Civilization = "humans" | "blobs" | "monsters";

export interface RawGalacticReport {
  total_spend_galactic: number;
  rows_affected: number;
  less_spent_at: number;
  big_spent_at: number;
  less_spent_value: number;
  big_spent_value: number;
  average_spend_galactic: number;
  big_spent_civ: string;
  less_spent_civ: string;
}

export type GalacticReport = Omit<
  RawGalacticReport,
  "big_spent_civ" | "less_spent_civ"
> & {
  id: string;

  fileName: string;
  date: string;

  isValid: boolean;

  big_spent_civ: Civilization;
  less_spent_civ: Civilization;
};

export type GalacticReportKey = Exclude<
  keyof RawGalacticReport,
  "less_spent_value"
>;
