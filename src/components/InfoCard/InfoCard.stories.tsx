import type { Meta, StoryObj } from "@storybook/react";

import { Deal, RecentHotels, TrendDes } from "../../pages/Home/types";
import InofCard from "./InfoCard";
import { ThemeContextProvider } from "../../contexts/ThemeContext";
import { Box } from "@mui/material";
import { MemoryRouter } from "react-router-dom";
const meta: Meta<typeof InofCard> = {
  title: "Components/InfoCard",
  component: InofCard,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <ThemeContextProvider>
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
        </ThemeContextProvider>
      </MemoryRouter>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof InofCard>;

const mockDeal: Deal = {
  hotelId: 1,
  hotelName: "Plaza Hotel",
  cityName: "Ramallah",
  hotelStarRating: 4.5,
  originalRoomPrice: 200,
  finalPrice: 100,
  roomPhotoUrl:
    "https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  discount: 0.5,
  title: "",
  description: "",
};

const mockRecent: RecentHotels = {
  hotelId: 2,
  hotelName: "The Grand Hotel",
  cityName: "Paris",
  starRating: 5,
  priceLowerBound: 150,
  visitDate: new Date(),
  priceUpperBound: 350,
  thumbnailUrl:
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
};

const mockDestination: TrendDes = {
  cityId: 2,
  cityName: "Phuket",
  countryName: "",
  description: "",
  thumbnailUrl:
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
};
export const FeaturedDeals: Story = {
  args: {
    variant: "featuredDeals",
    data: mockDeal,
  },
};

export const RecentlyVisitedHotels: Story = {
  args: {
    variant: "recentVisited",
    data: mockRecent,
  },
};

export const TrendingDestination: Story = {
  args: {
    variant: "destination",
    data: mockDestination,
  },
};
