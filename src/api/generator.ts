import { CoreApi } from "./main";

export const GeneratorApi = {
  downloadFile: async (
    size = 0.001,
    withErrors = true,
    maxSpend = 5_000
  ): Promise<Blob> => {
    if (size <= 0) {
      throw new Error("Размер файла должен быть больше 0");
    }

    if (maxSpend <= 0) {
      throw new Error("Максимальная сумма должна быть больше 0");
    }

    const response = await fetch(
      `${CoreApi.endpoint}/report?size=${size}&withErrors=${
        withErrors ? "on" : "off"
      }&maxSpend=${maxSpend}`,
      {
        method: "GET",
      }
    );

    if (!response.ok || !response.body) {
      throw new Error("Не удалось загрузить файл");
    }

    const blob = await response.blob();

    return blob;
  },
};
