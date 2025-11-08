import { createBrowserRouter, Navigate } from "react-router-dom";
import RootLayout from "./RootLayout";
import Login from "../pages/Login";
import ProtectedLayout from "./ProtectedLayout";
import Home from "../pages/Home";
import AdminAuthLayout from "./AdminAuthLayout";
import AdminDashboard from "../pages/AdminDashboard";
import SearchResults from "../pages/SearchResults";

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
        element: <ProtectedLayout />,
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
            element: <AdminAuthLayout />,
            children: [{ path: "admin", element: <AdminDashboard /> }],
          },
        ],
      },
    ],
  },
]);
