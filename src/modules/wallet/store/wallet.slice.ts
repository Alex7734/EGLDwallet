import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getBlockchainWalletAddress } from "@wallet/helpers/wallet.utils"
import { WalletState } from "@wallet/types/interfaces/wallet-state.interface";
import { fetchAccountData, fetchAccountTransactions } from "@wallet/store/thunks/featch-account-data.thunk";

const initialState: WalletState = {
  walletAddress: null,
  mnemonic: '',
  transactions: [],
  accountData: null,
  error: null,
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setMnemonics: (state, action: PayloadAction<string>) => {
      state.mnemonic = action.payload;
      state.walletAddress = getBlockchainWalletAddress(action.payload) ?? null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAccountData.pending, (state) => {
      state.error = null;
    });
    builder.addCase(fetchAccountData.fulfilled, (state, action) => {
      state.accountData = action.payload;
    });
    builder.addCase(fetchAccountData.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(fetchAccountTransactions.pending, (state) => {
      state.error = null;
    });
    builder.addCase(fetchAccountTransactions.fulfilled, (state, action) => {
      state.transactions = action.payload;
    });
    builder.addCase(fetchAccountTransactions.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export const { setMnemonics } = walletSlice.actions;
export default walletSlice.reducer;
