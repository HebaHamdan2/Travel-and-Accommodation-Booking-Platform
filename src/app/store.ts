import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import searchReducer from "../features/search/searchSlice";
import filtersReducer from "../features/filters/filtersSlice.ts";
import cartReducer from "../features/cart/cartSlice.ts";
import bookingReducer from "../features/booking/bookingSlice.ts";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import { checkTokenExpMiddleware } from "../middlewares/checkTokenExpMiddleware.ts";
import { searchResultsApi } from "../services/user/searchResults.ts";
import { homeApi } from "../services/user/home.ts";
import { hotelsApi } from "../services/user/hotels.ts";
import { bookingApi } from "../services/user/booking.ts";
import { adminNavigationApi } from "../services/admin/adminNavigation.ts";
import { citiesApi } from "../services/admin/cities.ts";
import { adminhotelsApi } from "../services/admin/hotels.ts";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "search", "cart"],
};
const rootReducer = combineReducers({
  auth: authReducer,
  search: searchReducer,
  filters: filtersReducer,
  cart: cartReducer,
  booking: bookingReducer,
  [homeApi.reducerPath]: homeApi.reducer,
  [searchResultsApi.reducerPath]: searchResultsApi.reducer,
  [hotelsApi.reducerPath]: hotelsApi.reducer,
  [bookingApi.reducerPath]: bookingApi.reducer,
  [adminNavigationApi.reducerPath]: adminNavigationApi.reducer,
  [citiesApi.reducerPath]: citiesApi.reducer,
  [adminhotelsApi.reducerPath]: adminhotelsApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      homeApi.middleware,
      checkTokenExpMiddleware,
      searchResultsApi.middleware,
      hotelsApi.middleware,
      bookingApi.middleware,
      adminNavigationApi.middleware,
      citiesApi.middleware,
      adminhotelsApi.middleware
    ),
});
export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
