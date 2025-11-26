import { Deal, RecentHotels, SearchRes, TrendDes } from "@/pages/Home/types";
import { CartRoomItemCardIfo, RoomCardInfo } from "../../Cards/types";


export const mockDeal: Deal = {
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

export const mockRecent: RecentHotels = {
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
export const mockDestination: TrendDes = {
  cityId: 2,
  cityName: "Phuket",
  countryName: "",
  description: "",
  thumbnailUrl:
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
};
export const mockResult: SearchRes = {
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
export const mockRoomCard: RoomCardInfo = {
  roomId: 1,
  roomNumber: 101,
  roomPhotoUrl:
    "https://cf.bstatic.com/xdata/images/hotel/max1280x900/33143786.jpg?k=4d0bca9d9795b80beb2cd9786946e043b23d1372eb633d5855d3aba6343d68d4&o=&hp=1",
  roomType: "Standard",
  capacityOfAdults: 2,
  capacityOfChildren: 1,
  roomAmenities: [
    {
      name: "Free Wi-Fi",
      description: "High-speed internet available in all rooms.",
    },
    {
      name: "TV",
      description: "Flat-screen TV with cable channels.",
    },
    {
      name: "Air Conditioning",
      description: "Individually controlled air conditioning.",
    },
  ],
  price: 150,
  availability: true,
  hotelName: "Plaza",
  checkInDate: "2025-12-23",
  checkOutDate: "2025-12-25",
};
export const mockedCartItem:  CartRoomItemCardIfo = {
  hotelName: "Plaza",
  roomId: 1,
  roomNumber: 101,
  roomPhotoUrl:
    "https://cf.bstatic.com/xdata/images/hotel/max1280x900/33143786.jpg?k=4d0bca9d9795b80beb2cd9786946e043b23d1372eb633d5855d3aba6343d68d4&o=&hp=1",
  roomType: "Standard",
  price: 150,
};