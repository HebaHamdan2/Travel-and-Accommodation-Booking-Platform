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
import { ROUTES } from "../utils/constans";
import ErrorPage from "../pages/ErrorPage";
import AdminErrorPage from "../pages/AdminErrorPage";
import AdminRoot from "../pages/AdminDashboard/components/AdminRoot";
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
        element: <AdminAuthLayout allowedRoles={["Admin"]} />,
        children: [
          {
            path: ROUTES.ADMIN.ROOT,
            element: <AdminDashboard />,
            errorElement: <AdminErrorPage />,
            children: [
              { index: true, element: <AdminRoot />, },
              { path: ROUTES.ADMIN.MANAGE_CITIES, element: <ManageCities /> },
              { path: ROUTES.ADMIN.MANAGE_HOTELS, element: <ManageHotels /> },
              {
                path: ROUTES.ADMIN.MANAGE_ROOMS,
                element: <ManageRooms />,
              },
            ],
          },
        ],
      },
      { path: "*", element: <ErrorPage /> },
    ],
  },
]);
