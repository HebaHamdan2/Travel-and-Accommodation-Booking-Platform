import type { Meta, StoryObj } from "@storybook/react";

import {
  Deal,
  RecentHotels,
  SearchRes,
  TrendDes,
} from "../../pages/Home/types";
import InofCard from "./InfoCard";
import { ThemeContextProvider } from "../../contexts/ThemeContext";
import { Box } from "@mui/material";
import { MemoryRouter } from "react-router-dom";
import { persistor, store } from "../../app/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
const meta: Meta<typeof InofCard> = {
  title: "Components/InfoCard",
  component: InofCard,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
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
        </PersistGate>
      </Provider>
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
const mockResult: SearchRes = {
  hotelId: 5,
  hotelName: "Seaside Retreat",
  starRating: 4,
  latitude: 37.774929,
  longitude: -122.419416,
  roomPrice: "130",
  roomType: "Ocean View",
  cityName: "San Francisco",
  roomPhotoUrl:
    "https://images.pexels.com/photos/271643/pexels-photo-271643.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  discount: 0.12,
  amenities: [
    {
      id: 0,
      name: "Ocean View Balcony",
      description: "Enjoy the sound of the waves from your balcony.",
    },
    {
      id: 0,
      name: "Spa Services",
      description: "Relax with in-room spa services.",
    },
  ],
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
export const SearchResultCard: Story = {
  args: {
    variant: "searchResult",
    data: mockResult,
  },
};
