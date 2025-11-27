import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AppProviders } from "./providers/AppProviders.tsx";
import GlobalErrorBoundary from "./errors/GlobalErrorBoundary.tsx";
createRoot(document.getElementById("root")!).render(
  <GlobalErrorBoundary>
    <AppProviders>
      <App />
    </AppProviders>
  </GlobalErrorBoundary>
);
