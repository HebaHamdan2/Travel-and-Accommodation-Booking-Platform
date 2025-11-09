import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import searchReducer from "../features/search/searchSlice";
import filtersReducer from "../features/filters/filtersSlice.ts";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import { homeApi } from "../services/home.ts";
import { checkTokenExpMiddleware } from "../middlewares/checkTokenExpMiddleware.ts";
import { PERSIST_ACTIONS } from "../utils/constans.ts";
import { searchResultsApi } from "../services/searchResults.ts";
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "search"],
};
const rootReducer = combineReducers({
  auth: authReducer,
  search: searchReducer,
  filters: filtersReducer,
  [homeApi.reducerPath]: homeApi.reducer,
  [searchResultsApi.reducerPath]: searchResultsApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist actions that are known to be non-serializable
        ignoredActions: PERSIST_ACTIONS,
      },
    }).concat(
      homeApi.middleware,
      checkTokenExpMiddleware,
      searchResultsApi.middleware
    ),
});
export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
