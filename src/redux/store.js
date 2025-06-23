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
import inspectionListReducer from "./inspectionListSlice"; // <-- import your inspection list reducer
import structureReducer from "./dataStructureSlice"; // <-- import your structure reducer

const persistConfig = {
  key: "root",
  storage,
};

const user = persistReducer(persistConfig, userReducer);
const structure = persistReducer(persistConfig, structureReducer); // <-- persist the inspection reducer
const inspections = persistReducer(persistConfig, inspectionListReducer); // <-- persist the inspection reducer

export const store = configureStore({
  reducer: {
    user: user,
    structure: structure, // <-- added here
    inspectionList: inspections, // <-- added here
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
