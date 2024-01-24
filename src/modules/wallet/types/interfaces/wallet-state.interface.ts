import { Account } from "@multiversx/sdk-core/out";
import { TransactionInfoType } from "@wallet/types/interfaces/transaction.interface";

export interface WalletStateType {
  mnemonic: string;
  accountData: Account | null
  transactions: TransactionInfoType[] | null;
  latestTransactionData: ConfirmTransactionInfoType;
  error: unknown;
  isLoading: boolean;
}

export interface ConfirmTransactionInfoType {
  amount: string | null;
  receiverAddress: string | null;
  txHash: string | null;
  didRefetch: boolean;
}
