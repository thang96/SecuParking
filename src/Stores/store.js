import {configureStore} from '@reduxjs/toolkit';
import userReducer from './Slices/userSlise';
import tokenSlice from './Slices/tokenSlice';
export const store = configureStore({
  reducer: {
    userId: userReducer,
    token: tokenSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({immutableCheck: false, serializableCheck: false}),
});
