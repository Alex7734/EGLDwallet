import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchAccountDataService,
  fetchAccountTransactionsService
} from "@wallet/services/wallet.service";
import { Account } from "@multiversx/sdk-core/out";
import { TransactionInfo } from "@wallet/types/interfaces/transaction.interface";

export const fetchAccountData = createAsyncThunk<Account, string, { rejectValue: string }>(
  'wallet/fetchAccountData',
  async (walletAddress, { rejectWithValue }) => {
    try {
      return await fetchAccountDataService(walletAddress);
    } catch (error) {
      return rejectWithValue(error as string);
    }
  }
);

export const fetchAccountTransactions = createAsyncThunk<TransactionInfo[], string, { rejectValue: string }>(
  'wallet/fetchAccountTransactions',
  async (walletAddress, { rejectWithValue }) => {
    try {
      return await fetchAccountTransactionsService(walletAddress);
    } catch (error) {
      return rejectWithValue(error as string);
    }
  }
);

