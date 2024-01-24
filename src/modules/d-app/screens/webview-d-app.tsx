import { WebView } from "react-native-webview";
import { useRef } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { DAppParamList, DAppRoutes } from "@d-app/navigation/routes/d-app-routes";

export const WebviewDApp = ({ navigation, route }: StackScreenProps<DAppParamList, DAppRoutes.Webview>) => {
  const accessToken = route.params?.accessToken;
  const webViewUrl = `https://testnet.template-dapp.multiversx.com/?accessToken=${accessToken}`;
  const loadingRef = useRef<boolean>();
  const refWebview = useRef<WebView>(null);
  const startLoading = () => (loadingRef.current = true);
  const reloadPage = () => refWebview.current?.reload()

  const handleMessage = (event: { nativeEvent: { data: string } }) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      console.log('Message received from DApp:', data);
    } catch (error) {
      console.error("Error parsing and handling message:", error);
    }
  };

  return (
      <>
          <WebView
            ref={refWebview}
            scalesPageToFit
            cacheEnabled
            javaScriptEnabled
            originWhitelist={["*"]}
            source={{ uri: webViewUrl }}
            style={{flex: 1}}
            onLoadStart={startLoading}
            startInLoadingState
            onMessage={handleMessage}
            onContentProcessDidTerminate={reloadPage}
          />
      </>
  );
};
