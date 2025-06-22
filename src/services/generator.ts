import { GeneratorApi } from "../api/generator";

export const GeneratorService = {
  generateFile: async (): Promise<void> => {
    const blob = await GeneratorApi.downloadFile();

    const date = new Date().toISOString().split("T")[0];
    const filename = `report-${date}.csv`;

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();

    URL.revokeObjectURL(url);
  },
};
