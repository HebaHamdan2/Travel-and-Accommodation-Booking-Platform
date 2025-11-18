import { ReactNode, StrictMode } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../app/store";
import { ThemeContextProvider } from "../contexts/ThemeContext";
import LoadingScreen from "../components/LoadingScreen";

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <StrictMode>
      <Provider store={store}>
        <PersistGate loading={<LoadingScreen />} persistor={persistor}>
          <ThemeContextProvider>{children}</ThemeContextProvider>
        </PersistGate>
      </Provider>
    </StrictMode>
  );
};
