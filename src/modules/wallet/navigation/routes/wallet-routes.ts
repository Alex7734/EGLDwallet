import { ConfirmTransactionInfo } from "@wallet/types/interfaces/wallet-state.interface";

export enum WalletRoutes {
  Wallet = 'Wallet Information',
  MakeTransaction = 'Make Transaction',
  SuccessTransaction = 'Success Transaction',
}

export type WalletParamList = {
  [WalletRoutes.Wallet]: undefined;
  [WalletRoutes.MakeTransaction]: undefined;
  [WalletRoutes.SuccessTransaction]: {
    transactionInformation: ConfirmTransactionInfo
  };
}
