import { GenerateButton } from "./components/GenerateButton/GenerateButton";

export function GeneratorPage() {
  return (
    <div className="layout-container">
      <div className="layout-group">
        <div style={{ textAlign: "center" }}>
          Сгенерируйте готовый csv-файл нажатием одной кнопки
        </div>
        <GenerateButton />
      </div>
    </div>
  );
}
