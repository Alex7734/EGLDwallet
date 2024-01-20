import { BASE_URL } from "@constants/api.constants";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Account } from '@multiversx/sdk-core/out';
import { TransactionInfo } from "@wallet/types/interfaces/transaction.interface";

export const apiService = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    fetchAccountData: builder.query<Account, string>({
      query: (walletAddress) => `/accounts/${walletAddress}`
    }),
    fetchAccountTransactions: builder.query<TransactionInfo[], string>({
      query: (walletAddress) => `/accounts/${walletAddress}/transactions`
    }),
  }),
});

export const { useFetchAccountDataQuery, useFetchAccountTransactionsQuery } = apiService;
