import type { Meta, StoryObj } from "@storybook/react";
import GenericDialog from "./GenericDialog";
import { ThemeContextProvider } from "../../contexts/ThemeContext";
import { Box } from "@mui/material";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../../app/store";
import * as Yup from "yup";
import { mockRenderForm } from "./mock/form.mock";
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
});

const meta: Meta<typeof GenericDialog> = {
  title: "Components/GenericDialog",
  component: GenericDialog,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MemoryRouter>
            <ThemeContextProvider>
              <Box
                sx={{
                  p: 4,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: "100vh",
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

type Story = StoryObj<typeof GenericDialog>;

export const AddDialog: Story = {
  args: {
    open: true,
    variant: "add",
    initialValues: { name: "" },
    validationSchema,
    renderForm: mockRenderForm,
    onSubmit: async () => true,
    onClose: () => {},
  },
};

export const UpdateDialog: Story = {
  args: {
    open: true,
    variant: "update",
    initialValues: { name: "Existing Item" },
    validationSchema,
    renderForm: mockRenderForm,
    onSubmit: async () => true,
    onClose: () => {},
  },
};

export const DeleteDialogStory: Story = {
  args: {
    open: true,
    variant: "delete",
    confirmText: "Delete Item",
    onConfirm: () => {},
    onClose: () => {},
  },
};
