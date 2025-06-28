import { CoreApi } from "./main";

export const AnalyticsApi = {
  uploadFile: async (
    file: File,
    rowsCount = 10_000
  ): Promise<ReadableStreamDefaultReader<Uint8Array<ArrayBufferLike>>> => {
    if (rowsCount <= 0) {
      throw new Error("Количество строк должно быть больше 0");
    }

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(
      `${CoreApi.endpoint}/aggregate?rows=${rowsCount}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const bodyStream = response.body?.getReader();

    if (!bodyStream) {
      throw new Error("Не удалось получить поток ответа");
    }

    return bodyStream;
  },
};
