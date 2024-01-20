export enum DAppRoutes {
  Webview = 'Webview DApp',
  LaunchWebview = 'Launch Webview',
}

export type DAppParamList = {
  [DAppRoutes.Webview]: undefined;
  [DAppRoutes.LaunchWebview]: undefined;
}
