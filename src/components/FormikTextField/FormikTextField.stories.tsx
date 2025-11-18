import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "@mui/material";
import { MemoryRouter } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import FormikTextFieldStory from "./mock/FormikTextFieldStory";
import { AppProviders } from "@/providers/AppProviders";
const meta: Meta<typeof FormikTextFieldStory> = {
  title: "Components/FormikTextField",
  component: FormikTextFieldStory,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <AppProviders>
        <MemoryRouter>
          <Box
            sx={{
              p: 4,
              backgroundColor: "background.default",
            }}
          >
            <Story />
          </Box>
        </MemoryRouter>
      </AppProviders>
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
