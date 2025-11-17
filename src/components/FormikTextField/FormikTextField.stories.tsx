import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "@mui/material";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import PersonIcon from "@mui/icons-material/Person";
import FormikTextFieldStory from "./mock/FormikTextFieldStory";
import { persistor, store } from "@/app/store";
import { ThemeContextProvider } from "@/contexts/ThemeContext";
const meta: Meta<typeof FormikTextFieldStory> = {
  title: "Components/FormikTextField",
  component: FormikTextFieldStory,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MemoryRouter>
            <ThemeContextProvider>
              <Box
                sx={{
                  p: 4,
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
  argTypes: {
    name: { control: "text" },
    label: { control: "text" },
    type: { control: "text" },
    multiline: { control: "boolean" },
    minRows: { control: "number" },
    icon: { control: false },
  },
};

export default meta;

type Story = StoryObj<typeof FormikTextFieldStory>;
export const Default: Story = {
  args: {
    name: "username",
    label: "Username",
    type: "text",
    multiline: false,
  },
};

export const WithIcon: Story = {
  args: {
    name: "username",
    label: "User Name",
    icon: <PersonIcon />,
  },
};

export const Multiline: Story = {
  args: {
    name: "bio",
    label: "Bio",
    multiline: true,
    minRows: 4,
  },
};
