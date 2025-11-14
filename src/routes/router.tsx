import { createBrowserRouter, Navigate } from "react-router-dom";
import RootLayout from "./RootLayout";
import Login from "../pages/Login";
import ProtectedLayout from "./ProtectedLayout";
import Home from "../pages/Home";
import AdminAuthLayout from "./AdminAuthLayout";
import AdminDashboard from "../pages/AdminDashboard";
import SearchResults from "../pages/SearchResults";
import Hotel from "../pages/Hotel";
import Checkout from "../pages/Checkout/Checkout";
import ManageCities from "../pages/AdminDashboard/components/ManageCities";
import ManageHotels from "../pages/AdminDashboard/components/ManageHotels";
import ManageRooms from "../pages/AdminDashboard/components/ManageRooms";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/home" replace />,
      },
      { path: "login", element: <Login /> },
      {
        element: <ProtectedLayout allowedRoles={["User"]} />,
        children: [
          {
            path: "home",
            element: <Home />,
          },
          {
            path: "search-results",
            element: <SearchResults />,
          },
          {
            path: "hotels/:hotelId",
            element: <Hotel />,
          },
          {
            path: "checkout",
            element: <Checkout />,
          },
        ],
      },
      {
        element: <AdminAuthLayout allowedRoles={["Admin"]} />,
        children: [
          {
            path: "admin",
            element: <AdminDashboard />,
            children: [
              { path: "manage-cities", element: <ManageCities /> },
              { path: "manage-hotels", element: <ManageHotels /> },
              {
                path: "manage-rooms",
                element: <ManageRooms />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
