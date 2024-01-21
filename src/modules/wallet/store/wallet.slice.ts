import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getBlockchainKeys } from "@wallet/helpers/wallet.utils";
import {
  ConfirmTransactionInfo,
  WalletState
} from "@wallet/types/interfaces/wallet-state.interface";
import { apiService } from "@wallet/services/wallet.service";

// TODO: Ask the MultiversX team if the following alternative approach is better:
// 1. When setMnemonics is dispatched, it should store the UserWallet object in the store.
// 2. Remove the WalletKeys & Wallet Address interface from the WalletState interface. Derive them from the UserWallet object.
// 3. Remove the getBlockchainKeys function from the wallet.utils.ts file.
// 4. Should I use the ITransactionOnNetwork interface from the @multiversx/sdk-core or is it okay to use the TransactionInfo interface from the WalletState interface?
// 5. Better way to handle the loading state of the wallet slice?

const initialState: WalletState = {
  walletAddress: '',
  mnemonic: '',
  keys: { secretKeyHex: null, publicKeyHex: null },
  transactions: [],
  latestTransactionData: {
    amount: null,
    receiverAddress: null,
    txHash: null,
  },
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
    setLatestTransactionData: (state, action: PayloadAction<ConfirmTransactionInfo>) => {
      state.latestTransactionData = {...action.payload};
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
      )
  },
});

export const { setMnemonics, setLatestTransactionData, setLoading } = walletSlice.actions;
export default walletSlice.reducer;
