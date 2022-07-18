import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import tableReducer from '../features/table/tableSlice';
import coinReducer from '../features/coin/coinSlice';
import userReducer from '../features/wallet/walletSlice';
import themeReducer from '../features/theme/themeSlice';

export const store = configureStore({
  reducer: {
    table: tableReducer,
    coin: coinReducer,
    user: userReducer,
    theme: themeReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
