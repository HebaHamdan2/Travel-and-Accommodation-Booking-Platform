import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { persistor, store } from "./app/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeContextProvider } from "./contexts/ThemeContext.tsx";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<LoadingScreen />} persistor={persistor}>
        <ThemeContextProvider>
          <App />
        </ThemeContextProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);
