import { Account } from "@multiversx/sdk-core/out";
import { TransactionInfo } from "@wallet/types/interfaces/transaction.interface";

export interface WalletState {
  walletAddress: string;
  mnemonic: string;
  keys: WalletKeys;
  accountData: Account | null
  transactions: TransactionInfo[] | null;
  latestTransactionData: ConfirmTransactionInfo;
  error: string | null | undefined | unknown;
  isLoading: boolean;
}

export interface WalletKeys {
  secretKeyHex: string | null;
  publicKeyHex: string | null;
}

export interface ConfirmTransactionInfo {
  amount: string | null;
  receiverAddress: string | null;
  txHash: string | null;
}
