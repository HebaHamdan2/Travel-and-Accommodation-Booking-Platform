import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "@mui/material";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { MemoryRouter } from "react-router-dom";
import { ThemeContextProvider } from "../../contexts/ThemeContext";
import { store, persistor } from "../../app/store";
import CustomSnackbar from "./CustomSnackbar";

const meta: Meta<typeof CustomSnackbar> = {
  title: "Components/CustomSnackbar",
  component: CustomSnackbar,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MemoryRouter>
            <ThemeContextProvider>
              <Box
                sx={{
                    p:5,
                  backgroundColor: "background.default",
                }}
              >
                <Story />
              </Box>
            </ThemeContextProvider>
          </MemoryRouter>
        </PersistGate>
      </Provider>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof CustomSnackbar>;

export const SuccessSnackbar: Story = {
  args: {
    open: true,
    message: "This is a success message!",
    severity: "success",
    autoHideDuration: 3000,
  },
};

export const WarningSnackbar: Story = {
  args: {
    open: true,
    message: "This is a warning message!",
    severity: "warning",
    autoHideDuration: 4000,
  },
};

export const ErrorSnackbar: Story = {
  args: {
    open: true,
    message: "An error occurred!",
    severity: "error",
    autoHideDuration: 5000,
  },
};

export const InfoSnackbar: Story = {
  args: {
    open: true,
    message: "Some info for you.",
    severity: "info",
    autoHideDuration: 4000,
  },
};
