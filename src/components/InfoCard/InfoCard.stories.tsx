import type { Meta, StoryObj } from "@storybook/react";
import InofCard from "./InfoCard";
import { Box } from "@mui/material";
import { MemoryRouter } from "react-router-dom";
import {
  mockDeal,
  mockDestination,
  mockedCartItem,
  mockRecent,
  mockResult,
  mockRoomCard,
} from "./mock/cards.mock";
import { AppProviders } from "@/providers/AppProviders";
const meta: Meta<typeof InofCard> = {
  title: "Components/InfoCard",
  component: InofCard,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <AppProviders>
        <MemoryRouter>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              p: 4,
              backgroundColor: "background.default",
              minHeight: "100vh",
            }}
          >
            <Story />
          </Box>
        </MemoryRouter>
      </AppProviders>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof InofCard>;

export const FeaturedDealCard: Story = {
  args: {
    variant: "featuredDeals",
    data: mockDeal,
  },
};

export const RecentlyVisitedHotelCard: Story = {
  args: {
    variant: "recentVisited",
    data: mockRecent,
  },
};
export const TrendingDestinationCard: Story = {
  args: {
    variant: "destination",
    data: mockDestination,
  },
};
export const SearchResultCard: Story = {
  args: {
    variant: "searchResult",
    data: mockResult,
  },
};
export const RoomCard: Story = {
  args: {
    variant: "roomCard",
    data: mockRoomCard,
  },
};
export const CartItemCard: Story = {
  args: {
    variant: "cartItem",
    data: mockedCartItem,
  },
};
