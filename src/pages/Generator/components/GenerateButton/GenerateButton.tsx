import { Button } from "../../../../components/Button/Button";
import { ButtonGroup } from "../../../../components/Button/ButtonGroup";
import CancelIcon from "../../../../components/icons/CancelIcon";
import { useStore } from "../../../../store/store";

export const GenerateButton = () => {
  const { generateFile, isLoading, error, isSuccess, resetFileState } =
    useStore((state) => state.generator);

  return (
    <ButtonGroup
      description={
        <span data-testid="generate-status">
          {error ||
            (isLoading
              ? "идёт процесс генерации"
              : isSuccess
              ? "файл сгенерирован"
              : "")}
        </span>
      }
    >
      <Button
        color={error ? "red" : isLoading ? "purple" : "green"}
        theme={isSuccess ? "tinted" : "filled"}
        text={isSuccess ? "Done!" : error ? "Ошибка" : "Начать генерацию"}
        isLoading={isLoading}
        onClick={generateFile}
      />
      {(isSuccess || error) && (
        <Button
          theme="filled"
          color="black"
          title="Сбросить"
          icon={<CancelIcon />}
          onClick={() => resetFileState()}
        />
      )}
    </ButtonGroup>
  );
};
