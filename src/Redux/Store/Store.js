import {configureStore} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import {combineReducers} from 'redux';
import login from '../Features/LoginSlice';
import application from '../Features/ApplicationSlice';
import topTab from '../Features/TopTabSlice';
import app from '../Features/AppSlice';
import rfq from '../Features/RFQsSlice';
import attributes from '../Features/AttributesSlice';
import agents from '../Features/AgentsSlice';
import enquiries from '../Features/EnquirySlice';
import logger from 'redux-logger';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['application', 'login'],
  timeout: null,
};

const reducers = combineReducers({
  login,
  application,
  topTab,
  rfq,
  app,
  attributes,
  agents,
  enquiries,
});

const rootReducer = (state, action) => {
  if (action.type === 'login/logout') {
    state = {application: state.application};
  }
  return reducers(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
});
