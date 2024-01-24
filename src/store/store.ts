import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import walletReducer from '@wallet/store/wallet.slice';
import { apiService } from "@wallet/store/apis/api.service";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';

const walletPersistConfig = {
  key: 'wallet',
  storage: AsyncStorage,
  whitelist: ['mnemonic']
};

const persistedWalletReducer = persistReducer(walletPersistConfig, walletReducer);

const rootReducer = combineReducers({
  wallet: persistedWalletReducer,
  [apiService.reducerPath]: apiService.reducer
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/REGISTER']
      }
    }).concat(apiService.middleware),});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
