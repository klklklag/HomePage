import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from 'redux-persist';
import localStorage from 'redux-persist/lib/storage';
// import sessionStorage from 'redux-persist/lib/storage/session';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { testReducer } from './test';
import { addInfoReducer } from "./addInfo";
import { contentReducer } from "./content";
import { partnerReducer } from "./partner";

const rootReducers = combineReducers({
  addInfo: addInfoReducer,
  content: contentReducer,
  partner: partnerReducer,

  test: testReducer,
});

const persistConfig = {
  key: 'root',
  storage: localStorage,
  whitelist: ['content'],
}

const rootReducer =  persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk, logger],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;