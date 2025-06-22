import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TopBar } from "./components/TopBar/TopBar";
import { AnalyticsPage } from "./pages/Analytics/Analytics";
import { GeneratorPage } from "./pages/Generator/Generator";
import { HistoryPage } from "./pages/History/History";

function App() {
  return (
    <BrowserRouter>
      <TopBar />
      <Routes>
        <Route index element={<AnalyticsPage />} />
        <Route path="/generate" element={<GeneratorPage />} />
        <Route path="/history" element={<HistoryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
