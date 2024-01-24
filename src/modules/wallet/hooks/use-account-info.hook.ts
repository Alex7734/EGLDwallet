import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { walletAddressSelector } from "@wallet/store/selectors/wallet.selector";
import { apiService, useFetchAccountDataQuery, useFetchAccountTransactionsQuery } from "@wallet/store/apis/api.service";
import { TransactionWatcher } from "@multiversx/sdk-core";
import { apiNetworkProvider } from "@wallet/services/networking.service";
import { RootState } from "@store/store";
import { createTransactionFromHex } from "@wallet/helpers/wallet.utils";
import { TransactionInfoType } from "@wallet/types/interfaces/transaction.interface";
import { Account } from "@multiversx/sdk-core/out";
import { setLatestTransactionDidRefetch } from "@wallet/store/wallet.slice";

export interface UseAccountInfoReturnType {
  accountData: Account | undefined;
  isFetchingAccountData: boolean;
  transactions: TransactionInfoType[] | undefined;
  isFetchingTransactions: boolean;
}

export const useAccountInfo = (): UseAccountInfoReturnType => {
  const dispatch = useDispatch();
  const latestTransactionHex = useSelector((state: RootState) => state.wallet.latestTransactionData.txHash)
  const latestTransactionDidRefetch = useSelector((state: RootState) => state.wallet.latestTransactionData.didRefetch)
  const walletAddress = useSelector(walletAddressSelector);
  const { data: accountData, isFetching: isFetchingAccountData } = useFetchAccountDataQuery(walletAddress);
  const { data: transactions, isFetching: isFetchingTransactions } = useFetchAccountTransactionsQuery(walletAddress);

  useEffect(() => {
    if (latestTransactionHex == null) return;
    if (latestTransactionDidRefetch) return;

    const refetchData = async () => {
      const watcher = new TransactionWatcher(apiNetworkProvider);
      const latestTransaction = createTransactionFromHex(latestTransactionHex);
      await watcher.awaitCompleted(latestTransaction);
      dispatch(apiService.util.invalidateTags(['Account', 'Transactions']));
    };

    dispatch(setLatestTransactionDidRefetch(true));
    refetchData();
  }, [latestTransactionDidRefetch, latestTransactionHex]);

  return {
    accountData,
    isFetchingAccountData,
    transactions,
    isFetchingTransactions,
  }
}
