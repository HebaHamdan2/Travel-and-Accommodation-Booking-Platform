import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "@mui/material";
import { MemoryRouter } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import { AppProviders } from "@/providers/AppProviders";
import CommonTextField from "./CommonTextField";
import CommonTextFieldStory from "./mock/CommonTextFieldStory";

const meta: Meta<typeof CommonTextField> = {
  title: "Components/CommonTextField",
  component: CommonTextField,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <AppProviders>
        <MemoryRouter>
          <Box
            sx={{
              p: 4,
              display: "flex",
              justifyContent: "center",
              backgroundColor: "background.default",
            }}
          >
            <Box sx={{ width: 400 }}>
              <Story />
            </Box>
          </Box>
        </MemoryRouter>
      </AppProviders>
    ),
  ],
  argTypes: {
    name: { control: "text" },
    label: { control: "text" },
    value: { control: "text" },
    helperText: { control: "text" },
    multiline: { control: "boolean" },
    minRows: { control: "number" },
    icon: { control: false },
    onChange: { action: "changed" },
    onBlur: { action: "blurred" },
  },
};

export default meta;

type Story = StoryObj<typeof CommonTextField>;

export const Default: Story = {
  args: {
    name: "username",
    label: "Username",
    value: "",
    multiline: false,
    minRows: 1,
    helperText: "",
  },
  render: (args) => <CommonTextFieldStory {...args} />,
};

export const WithIcon: Story = {
  args: {
    name: "username",
    label: "Username",
    value: "",
    icon: <PersonIcon />,
  },
  render: (args) => <CommonTextFieldStory {...args} />,
};

export const Multiline: Story = {
  args: {
    name: "bio",
    label: "Bio",
    value: "",
    multiline: true,
    minRows: 4,
  },
  render: (args) => <CommonTextFieldStory {...args} />,
};
