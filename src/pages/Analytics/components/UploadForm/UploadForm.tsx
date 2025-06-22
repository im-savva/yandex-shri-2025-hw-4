import type { GalacticReport } from "../../../../App.types";
import { Button } from "../../../../components/Button/Button";
import { ButtonGroup } from "../../../../components/Button/ButtonGroup";
import { DropZone } from "../../../../components/DropZone/DropZone";
import CancelIcon from "../../../../components/icons/CancelIcon";
import { AnalyticsService } from "../../../../services/analytics";
import { truncate } from "../../../../shared/truncate";
import { useStore } from "../../../../store/store";

export const UploadForm = () => {
  const {
    file,
    uploadFile,
    resetFileState,

    isLoading,
    setIsLoading,

    error,
    setError,

    isSuccess,
    setIsSuccess,

    setCurrentMetrics,
  } = useStore((state) => state.analytics);

  const { upsertReport } = useStore((state) => state.history);

  const handleUploadButtonClick = () => {
    if (isLoading) return;

    const fileInput = document.createElement("input");

    fileInput.type = "file";
    fileInput.accept = ".csv";

    fileInput.onchange = (event) => {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        const file = target.files[0];

        uploadFile(file);
      }
    };

    fileInput.click();
  };

  const handleFileDrop = (files: File[]) => {
    if (files.length > 0) {
      const file = files[0];
      uploadFile(file);
    }
  };

  const handleProcessClick = () => {
    if (!file || error || isLoading || isSuccess) return;

    setIsLoading(true);

    const processFileCallback = (
      error: string | null,
      metrics: GalacticReport | null
    ) => {
      if (error) {
        setIsLoading(false);
        setError(error);
        return;
      }

      if (metrics) {
        setCurrentMetrics(metrics);
      }
    };

    const processFileSuccess = (report: GalacticReport | null) => {
      if (!report) return;

      upsertReport(report);

      if (!report.isValid) {
        processFileCallback("Некорректные данные в файле", null);
      } else {
        setIsSuccess(true);
        setIsLoading(false);
        setError(null);
      }
    };

    AnalyticsService.processFile(file, processFileCallback)
      .then(processFileSuccess)
      .catch((err) => {
        processFileCallback(err.message, null);
      });
  };

  return (
    <div className="layout-group">
      <div style={{ textAlign: "center" }}>
        Загрузите <b>csv</b> файл и получите <b>полную информацию</b> о нём за
        сверхнизкое время
      </div>
      <DropZone
        state={error ? "error" : file ? "fileSelected" : "default"}
        isDisabled={isLoading}
        onDrop={handleFileDrop}
        onClick={handleUploadButtonClick}
      >
        {file ? (
          <ButtonGroup
            description={
              error
                ? error
                : isLoading
                ? "идёт парсинг файла"
                : isSuccess
                ? "готово!"
                : "файл загружен!"
            }
          >
            <Button
              isLoading={isLoading}
              theme={isSuccess ? "tinted" : "filled"}
              color={error ? "red" : isSuccess ? "green" : "purple"}
              text={truncate(file.name, 25)}
              onClick={handleUploadButtonClick}
            />
            {!isLoading && (
              <Button
                theme="filled"
                color="black"
                icon={<CancelIcon />}
                onClick={() => resetFileState()}
              />
            )}
          </ButtonGroup>
        ) : (
          <ButtonGroup description="или перетащите файл сюда">
            <Button
              theme="filled"
              color="white"
              text="Загрузить файл"
              onClick={handleUploadButtonClick}
            />
          </ButtonGroup>
        )}
      </DropZone>
      {!(error || isLoading || isSuccess) && (
        <Button
          isDisabled={!file || !!error}
          color="green"
          theme="filled"
          text="Отправить"
          style={{ margin: "0 auto" }}
          onClick={handleProcessClick}
        />
      )}
    </div>
  );
};
