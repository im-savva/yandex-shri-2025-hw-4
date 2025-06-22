import { Highlights } from "./components/Highlights/Highlights";
import { UploadForm } from "./components/UploadForm/UploadForm";

export function AnalyticsPage() {
  return (
    <div className="layout-container">
      <UploadForm />
      <Highlights />
    </div>
  );
}
