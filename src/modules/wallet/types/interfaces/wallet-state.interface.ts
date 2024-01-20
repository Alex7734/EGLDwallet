import { Account } from "@multiversx/sdk-core/out";
import { TransactionInfo } from "@wallet/types/interfaces/transaction.interface";

export interface WalletState {
  walletAddress: string | null;
  mnemonic: string;
  accountData: Account | null
  transactions: TransactionInfo[] | null;
  error: string | null | undefined | unknown;
}
