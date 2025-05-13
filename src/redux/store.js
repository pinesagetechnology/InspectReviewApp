import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import inspectionReducer from "./inspectionSlice"; // <-- import your inspection reducer

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, userReducer);
const persistedReducer2 = persistReducer(persistConfig, inspectionReducer); // <-- persist the inspection reducer

export const store = configureStore({
  reducer: {
    user: persistedReducer,
    inspection: persistedReducer2, // <-- added here
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
