import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  ConfirmTransactionInfoType,
  WalletStateType
} from "@wallet/types/interfaces/wallet-state.interface";
import { apiService } from "@wallet/store/apis/api.service";

const initialState: WalletStateType = {
  mnemonic: '',
  transactions: [],
  latestTransactionData: {
    amount: null,
    receiverAddress: null,
    txHash: null,
    didRefetch: false,
  },
  accountData: null,
  error: null,
  isLoading: false,
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setMnemonic: (state, action: PayloadAction<string>) => {
      state.mnemonic = action.payload;
    },
    setLatestTransactionData: (state, action: PayloadAction<ConfirmTransactionInfoType>) => {
      state.latestTransactionData = {...action.payload};
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setLatestTransactionDidRefetch: (state, action: PayloadAction<boolean>) => {
      state.latestTransactionData.didRefetch = action.payload;
    }
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
      )
  },
});

export const { setMnemonic, setLatestTransactionData, setLoading, setLatestTransactionDidRefetch } = walletSlice.actions;
export default walletSlice.reducer;
