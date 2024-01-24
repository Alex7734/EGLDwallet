import { BASE_API_URL } from "@constants/api.constants";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TransactionInfoType } from "@wallet/types/interfaces/transaction.interface";
import { Account } from "@multiversx/sdk-core/out";
import { UserWallet } from "@multiversx/sdk-wallet/out";
import { SendTransactionData } from "@wallet/schemas/wallet.schema";
import {
  getAccountDetails, getTransactions,
  makeTransaction,
} from "@wallet/services/networking.service";

export const apiService = createApi({
  reducerPath: 'api',
  tagTypes: ['Account', 'Transactions'],
  baseQuery: fetchBaseQuery({ baseUrl: BASE_API_URL }),
  endpoints: (builder) => ({
    fetchAccountData: builder.query<Account, string>({
      query: getAccountDetails,
      providesTags: (result, error, walletAddress) => [{ type: 'Account', id: walletAddress }]
    }),
    fetchAccountTransactions: builder.query<TransactionInfoType[], string>({
      query: getTransactions,
      providesTags: (result, error, walletAddress) => [{ type: 'Transactions', id: walletAddress }]
    }),
    sendTransaction: builder.mutation<string, { transactionData: SendTransactionData, accountData: Account, userWallet: UserWallet }>({
      queryFn: makeTransaction,
      invalidatesTags: ['Account', 'Transactions'],
    }),

  }),
});

export const { useFetchAccountDataQuery, useFetchAccountTransactionsQuery, useSendTransactionMutation } = apiService;
