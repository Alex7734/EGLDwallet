import { BASE_API_URL, BASE_GATEWAY_URL } from "@constants/api.constants";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TransactionInfo } from "@wallet/types/interfaces/transaction.interface";
import { stringToIAddress } from "@wallet/helpers/wallet.utils";
import { Account, TokenTransfer, Transaction } from "@multiversx/sdk-core/out";
import { UserSigner, UserWallet } from "@multiversx/sdk-wallet/out";
import { SendTransactionData } from "@wallet/schemas/wallet.schema";
import { ApiNetworkProvider, ProxyNetworkProvider } from "@multiversx/sdk-network-providers/out";
import { TEST_PASSWORD } from "@constants/api.constants";

export const apiNetworkProvider = new ApiNetworkProvider(BASE_API_URL);
export const proxyNetworkProvider = new ProxyNetworkProvider(BASE_GATEWAY_URL);

export const apiService = createApi({
  reducerPath: 'api',
  tagTypes: ['Account', 'Transactions'],
  baseQuery: fetchBaseQuery({ baseUrl: BASE_API_URL }),
  endpoints: (builder) => ({
    fetchAccountData: builder.query<Account, string>({
      query: (walletAddress) => `/accounts/${walletAddress}`,
      providesTags: (result, error, walletAddress) => [{ type: 'Account', id: walletAddress }]
    }),
    fetchAccountTransactions: builder.query<TransactionInfo[], string>({
      query: (walletAddress) => `/accounts/${walletAddress}/transactions`,
      providesTags: (result, error, walletAddress) => [{ type: 'Transactions', id: walletAddress }]
    }),
    sendTransaction: builder.mutation<string, { data: SendTransactionData, accountData: Account, userWallet: UserWallet }>({
      queryFn: async ({ data, accountData, userWallet }) => {
        try {
          const networkConfig = await apiNetworkProvider.getNetworkConfig();
          const senderAddress = stringToIAddress(accountData.address.toString());
          const signer = UserSigner.fromWallet(userWallet.toJSON(), TEST_PASSWORD);

          const transaction = new Transaction({
            chainID: networkConfig.ChainID,
            gasLimit: networkConfig.MinGasLimit,
            nonce: accountData.nonce,
            sender: senderAddress,
            receiver: data.address,
            value: TokenTransfer.egldFromAmount(data.amount),
          });

          const serializedTransaction = transaction.serializeForSigning();
          const transactionSignature = await signer.sign(serializedTransaction);
          transaction.applySignature(transactionSignature);

          const transactionHash = await proxyNetworkProvider.sendTransaction(transaction);
          return { data: transactionHash };
        } catch (error: any) {
          // TODO: Handle error and add custom error messages
          return { error };
        }
      },
      invalidatesTags: ['Account', 'Transactions'],
    }),

  }),
});

export const { useFetchAccountDataQuery, useFetchAccountTransactionsQuery, useSendTransactionMutation } = apiService;
