import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import storageSession from "redux-persist/lib/storage/session";
import { persistReducer } from "redux-persist";

import user from "../src/_reducers/user.js";

const rootReducer = combineReducers({
  user: user,
});

const persistConfig = {
  key: "root",
  // 로컬 스토리지에 저장할 경우 storage, 세션에 저장할 경우 storageSession
  storage: storageSession,
  // whitelist : ['적용대상목록']
  // blacklist : ['미적용대상목록']
  whitelist: ["user"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store;
