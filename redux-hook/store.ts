import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // defaults to localStorage
import { persistReducer, persistStore } from "redux-persist";
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import authApi from "../feature/api/authApi";
import dashboardApi from "../feature/api/dashboardApi";
import mediaUploadApi from "../feature/api/mediaUploadApi";
import userApi from "../feature/api/userApi";
import userReducer from "../feature/auth/authSlice";
import courseReducer from "../feature/course/courseSlice";
import moduleVideoPlay from "../feature/course/moduleVideoplay";
import moduleReducer from "../feature/module/moduleSlice";
import moduleAssignments from "../feature/moduleAssignment/moduleAssignment";

// Step 1: Persist config for only the `auth` slice
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "refresh"], // only persist these fields
};

// Step 2: Combine reducers and wrap `auth` with persistReducer
const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, userReducer),
  course: courseReducer,
  module: moduleReducer,
  playVideo: moduleVideoPlay,
  moduleAssignments: moduleAssignments,
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [mediaUploadApi.reducerPath]: mediaUploadApi.reducer,
  [dashboardApi.reducerPath]: dashboardApi.reducer,
});

// Step 3: Create the store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Fix for redux-persist with RTK Query
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      authApi.middleware,
      userApi.middleware,
      mediaUploadApi.middleware,
      dashboardApi.middleware
    ),
  devTools: true,
});

// Step 4: Create the persistor
export const persistor = persistStore(store);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
