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
import inspectionListReducer from "./inspectionListSlice"; // <-- import your inspection list reducer

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, userReducer);
const persistedReducer2 = persistReducer(persistConfig, inspectionReducer); // <-- persist the inspection reducer
const persistedReducer3 = persistReducer(persistConfig, inspectionListReducer); // <-- persist the inspection reducer

export const store = configureStore({
  reducer: {
    user: persistedReducer,
    structure: persistedReducer2, // <-- added here
    inspectionList: persistedReducer3, // <-- added here
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
