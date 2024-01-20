export enum AppNavigatorRoutes {
  WalletImport = 'Wallet Import',
  WalletApp = 'WalletApp',
}

export type AppNavigatorParamList = {
  [AppNavigatorRoutes.WalletApp]: undefined;
  [AppNavigatorRoutes.WalletImport]: undefined;
}
