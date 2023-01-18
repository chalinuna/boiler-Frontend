import {
  configureStore,
  combineReducers,
} from "@reduxjs/toolkit";

import user from "../src/_reducers/user.js";

const rootReducer = combineReducers({
  user: user,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
