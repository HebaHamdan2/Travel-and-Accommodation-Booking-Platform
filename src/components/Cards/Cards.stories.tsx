import type { Meta, StoryObj } from "@storybook/react";
import FeaturedDealCard from "./FeaturedDealCard";
import SearchResultCard from "./SearchResultCard";
import RoomCard from "./RoomCard";
import CartItemCard from "./CartItemCard";
import RecentVisitedCard from "./RecentVisitedCard";
import { Box } from "@mui/material";
import { MemoryRouter } from "react-router-dom";
import { AppProviders } from "@/providers/AppProviders";

import {
  mockDeal,
  mockDestination,
  mockedCartItem,
  mockRecent,
  mockResult,
  mockRoomCard,
} from "./mock/cards.mock";
import DestinationCard from "./DestinationCard ";

const withProviders = (Story: any) => (
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
);

const meta: Meta = {
  title: "Components/Cards",
  decorators: [withProviders],
};
export default meta;

export const FeaturedDeal: StoryObj<typeof FeaturedDealCard> = {
  render: () => <FeaturedDealCard data={mockDeal} />,
};
export const RecentlyVisited: StoryObj<typeof RecentVisitedCard> = {
  render: () => <RecentVisitedCard data={mockRecent} />,
};
export const TrendingDestination: StoryObj<typeof DestinationCard> = {
  render: () => <DestinationCard data={mockDestination} />,
};
export const SearchResult: StoryObj<typeof SearchResultCard> = {
  render: () => <SearchResultCard data={mockResult} />,
};
export const RoomCardItem: StoryObj<typeof RoomCard> = {
  render: () => <RoomCard data={mockRoomCard} />,
};
export const CartItem: StoryObj<typeof CartItemCard> = {
  render: () => <CartItemCard data={mockedCartItem} />,
};
