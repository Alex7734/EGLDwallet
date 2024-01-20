import { configureStore } from '@reduxjs/toolkit';
import walletReducer from '@wallet/store/wallet.slice';
import { apiService } from "@wallet/services/wallet.service";

const store = configureStore({
  reducer: {
    wallet: walletReducer,
    [apiService.reducerPath]: apiService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiService.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
