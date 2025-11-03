import { Meta, StoryObj } from "@storybook/react";
import { fn } from "storybook/test";
import Button from "./Button";

const meta = {
  component: Button,
  title: "Button",
  tags: ["autodocs"],
  args: {
    onClick: fn(),
  },
  argTypes: {
    variant: { control: "radio", options: ["primary", "secondary", "outline"] },
    size: { control: "radio", options: ["small", "medium", "large"] },
    color: { control: "select", options: ["pink", "teal"] },
    children: { control: "text" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    color: "pink",
    size: "large",
    children: "Primary Content",
  },
};
export const Secondary: Story = {
  args: {
    variant: "secondary",
    color: "teal",
    size: "medium",
    children: "Secondary Content",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    color: "pink",
    size: "medium",
    children: "Text content",
  },
};