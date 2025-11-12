/*import { configureStore, combineReducers } from "@reduxjs/toolkit";
import nuoveReducer from "../reducer";
import audioReducer from "../audioReducer";

const Reducer = combineReducers({
  nuove: nuoveReducer,
  audioA: audioReducer,
});

const store = configureStore({
  reducer: Reducer,
});

export default store; */

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import nuoveReducer from "../reducer";
import audioReducer from "../audioReducer";

const Reducer = combineReducers({
  nuove: nuoveReducer,
  audioA: audioReducer,
});

const store = configureStore({
  reducer: Reducer,
});

export default store;
