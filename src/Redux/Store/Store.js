import {configureStore} from '@reduxjs/toolkit';
import login from '../Features/LoginSlice';
import logger from 'redux-logger';

export const store = configureStore({
  reducer: {
    login,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
});
