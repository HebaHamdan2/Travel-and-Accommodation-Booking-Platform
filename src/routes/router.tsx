import { createBrowserRouter, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import { ROUTES } from "@/utils/constans";
import LoadingScreen from "@/components/LoadingScreen";
const RootLayout = lazy(() => import("./RootLayout"));
const Login = lazy(() => import("@/pages/Login"));
const Home = lazy(() => import("@/pages/Home"));
const SearchResults = lazy(() => import("@/pages/SearchResults"));
const Hotel = lazy(() => import("@/pages/Hotel"));
const Checkout = lazy(() => import("@/pages/Checkout"));
const AdminDashboard = lazy(() => import("@/pages/AdminDashboard"));
const UnauthorizedPage = lazy(() => import("@/errors/UnauthorizedPage"));
const ErrorPage = lazy(() => import("@/errors/ErrorPage"));
const AdminErrorPage = lazy(() => import("@/errors/AdminErrorPage"));
const ProtectedLayout = lazy(() => import("./ProtectedLayout"));
const AdminRoot = lazy(
  () => import("@/pages/AdminDashboard/components/AdminRoot")
);
const ManageCities = lazy(
  () => import("@/pages/AdminDashboard/components/ManageCities")
);
const ManageHotels = lazy(
  () => import("@/pages/AdminDashboard/components/ManageHotels")
);
const ManageRooms = lazy(
  () => import("@/pages/AdminDashboard/components/ManageRooms")
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <RootLayout />
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback={<LoadingScreen />}>
        <ErrorPage />
      </Suspense>
    ),
    children: [
      { index: true, element: <Navigate to={ROUTES.HOME} replace /> },
      {
        path: ROUTES.LOGIN,
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <Login />
          </Suspense>
        ),
      },
      {
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <ProtectedLayout allowedRoles={["User"]} />
          </Suspense>
        ),
        children: [
          {
            path: ROUTES.HOME,
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <Home />
              </Suspense>
            ),
          },
          {
            path: ROUTES.SEARCH_RESULTS,
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <SearchResults />
              </Suspense>
            ),
          },
          {
            path: "hotels/:hotelId",
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <Hotel />
              </Suspense>
            ),
          },
          {
            path: ROUTES.CHECKOUT,
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <Checkout />
              </Suspense>
            ),
          },
        ],
      },
      {
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <ProtectedLayout allowedRoles={["Admin"]} />
          </Suspense>
        ),
        children: [
          {
            path: ROUTES.ADMIN.ROOT,
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <AdminDashboard />
              </Suspense>
            ),
            children: [
              {
                index: true,
                element: (
                  <Suspense fallback={<LoadingScreen />}>
                    <AdminRoot />
                  </Suspense>
                ),
              },
              {
                path: ROUTES.ADMIN.MANAGE_CITIES,
                element: (
                  <Suspense fallback={<LoadingScreen />}>
                    <ManageCities />
                  </Suspense>
                ),
              },
              {
                path: ROUTES.ADMIN.MANAGE_HOTELS,
                element: (
                  <Suspense fallback={<LoadingScreen />}>
                    <ManageHotels />
                  </Suspense>
                ),
              },
              {
                path: ROUTES.ADMIN.MANAGE_ROOMS,
                element: (
                  <Suspense fallback={<LoadingScreen />}>
                    <ManageRooms />
                  </Suspense>
                ),
              },
              {
                path: "*",
                element: (
                  <Suspense fallback={<LoadingScreen />}>
                    <AdminErrorPage />
                  </Suspense>
                ),
              },
            ],
          },
        ],
      },

      {
        path: ROUTES.UNAUTHORIZED,
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <UnauthorizedPage />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <ErrorPage status={404} message="Not Found" />
          </Suspense>
        ),
      },
    ],
  },
]);
