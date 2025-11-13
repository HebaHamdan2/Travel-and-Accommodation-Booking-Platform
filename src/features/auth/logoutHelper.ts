import { AppDispatch, persistor } from "../../app/store";
import { logout } from "./authSlice";

import { resetSearch } from "../search/searchSlice";
import { clearCart } from "../cart/cartSlice";

import { homeApi } from "../../services/user/home";
import { hotelsApi } from "../../services/user/hotels";
import { bookingApi } from "../../services/user/booking";
import { searchResultsApi } from "../../services/user/searchResults";
import { adminNavigationApi } from "../../services/admin/adminNavigation";
export const performLogout = () => async (dispatch: AppDispatch) => {
  // Clear Redux slices
  dispatch(logout());
  dispatch(clearCart());
  dispatch(resetSearch());

  // Clear RTK Query cache
  const apiSlices = [
    homeApi,
    hotelsApi,
    bookingApi,
    searchResultsApi,
    adminNavigationApi,
  ];

  apiSlices.forEach((api) => dispatch(api.util.resetApiState()));
  // Clear persisted storage (auth, cart, search)
  await persistor.purge();
};
