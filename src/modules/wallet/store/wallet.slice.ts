import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getBlockchainKeys } from "@wallet/helpers/wallet.utils";
import {
  WalletState
} from "@wallet/types/interfaces/wallet-state.interface";
import { apiService } from "@wallet/services/wallet.service";

const initialState: WalletState = {
  walletAddress: '',
  mnemonic: '',
  keys: { secretKeyHex: null, publicKeyHex: null },
  transactions: [],
  accountData: null,
  error: null,
  isLoading: false,
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setMnemonics: (state, action: PayloadAction<string>) => {
      const keys = getBlockchainKeys(action.payload);
      state.mnemonic = action.payload;
      state.walletAddress = keys.publicKey.toAddress().toString();
      state.keys.publicKeyHex = keys.publicKey.hex();
      state.keys.secretKeyHex = keys.secretKey.hex();
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        apiService.endpoints.fetchAccountData.matchPending,
        (state) => {
          state.error = null;
        }
      )
      .addMatcher(
        apiService.endpoints.fetchAccountData.matchFulfilled,
        (state, action) => {
          state.accountData = action.payload;
        }
      );
  },
});

export const { setMnemonics, setLoading } = walletSlice.actions;
export default walletSlice.reducer;
