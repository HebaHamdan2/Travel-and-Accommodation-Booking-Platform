import { http, HttpResponse, HttpHandler } from "msw";

export const homeHandlers: HttpHandler[] = [
  http.get("*/api/home/featured-deals", () => {
    return HttpResponse.json(
      [
        {
          hotelId: 1,
          hotelName: "Hotel A",
          finalPrice: 100,
          roomPhotoUrl: "/hotel-a.jpg",
        },
        {
          hotelId: 2,
          hotelName: "Hotel B",
          finalPrice: 200,
          roomPhotoUrl: "/hotel-b.jpg",
        },
      ],
      { status: 200 }
    );
  }),
  http.get("*/api/home/users/1/recent-hotels", () => {
    return HttpResponse.json(
      [
        {
          hotelId: 3,
          hotelName: "Hotel C",
          finalPrice: 150,
          roomPhotoUrl: "/hotel-c.jpg",
        },
      ],
      { status: 200 }
    );
  }),
  http.get("*/api/home/destinations/trending", () => {
    return HttpResponse.json(
      [
        { cityId: 1, cityName: "Paris", thumbnailUrl: "/paris.jpg" },
        { cityId: 2, cityName: "Tokyo", thumbnailUrl: "/tokyo.jpg" },
      ],
      { status: 200 }
    );
  }),
];
