import AdminRoot from "@/pages/AdminDashboard/components/AdminRoot";
import { createBrowserRouter, Navigate } from "react-router-dom";
import RootLayout from "./RootLayout";
import { ROUTES } from "@/utils/constans";
import Login from "@/pages/Login";
import ProtectedLayout from "./ProtectedLayout";
import Home from "@/pages/Home";
import SearchResults from "@/pages/SearchResults";
import Hotel from "@/pages/Hotel";
import Checkout from "@/pages/Checkout";
import AdminDashboard from "@/pages/AdminDashboard";
import ManageCities from "@/pages/AdminDashboard/components/ManageCities";
import ManageHotels from "@/pages/AdminDashboard/components/ManageHotels";
import ManageRooms from "@/pages/AdminDashboard/components/ManageRooms";
import ErrorPage from "@/errors/ErrorPage";
import AdminErrorPage from "@/errors/AdminErrorPage";
import UnauthorizedPage from "@/errors/UnauthorizedPage";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to={ROUTES.HOME} replace />,
      },
      { path: ROUTES.LOGIN, element: <Login /> },
      {
        element: <ProtectedLayout allowedRoles={["User"]} />,
        children: [
          {
            path: ROUTES.HOME,
            element: <Home />,
          },
          {
            path: ROUTES.SEARCH_RESULTS,
            element: <SearchResults />,
          },
          {
            path: "hotels/:hotelId",
            element: <Hotel />,
          },
          {
            path: ROUTES.CHECKOUT,
            element: <Checkout />,
          },
        ],
      },
      {
        element: <ProtectedLayout allowedRoles={["Admin"]} />,
        children: [
          {
            path: ROUTES.ADMIN.ROOT,
            element: <AdminDashboard />,
            children: [
              {
                index: true,
                element: <AdminRoot />,
              },
              {
                path: ROUTES.ADMIN.MANAGE_CITIES,
                element: <ManageCities />,
              },
              {
                path: ROUTES.ADMIN.MANAGE_HOTELS,
                element: <ManageHotels />,
              },
              {
                path: ROUTES.ADMIN.MANAGE_ROOMS,
                element: <ManageRooms />,
              },
              { path: "*", element: <AdminErrorPage /> },
            ],
          },
        ],
      },
      { path: ROUTES.UNAUTHORIZED, element: <UnauthorizedPage /> },
      { path: "*", element: <ErrorPage status={404} message="Not Found" /> },
    ],
  },
]);
