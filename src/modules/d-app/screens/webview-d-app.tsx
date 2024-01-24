import { WebView } from "react-native-webview";
import { useRef } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { DAppParamList, DAppRoutes } from "@d-app/navigation/routes/d-app-routes";
import { useWebviewTransaction } from "@d-app/hooks/use-webview-transaction.hook";
import { ModalTransactionInfo } from "@d-app/components/modal-transaction-info";

export const WebviewDApp = ({ route }: StackScreenProps<DAppParamList, DAppRoutes.Webview>) => {
  const accessToken = route.params?.accessToken;
  const webViewUrl = `https://testnet.template-dapp.multiversx.com/?accessToken=${accessToken}`;

  const { refWebview, handleTransactionFromWebview, modalDetails, onCloseModal, onAcceptTransaction } = useWebviewTransaction()
  const loadingRef = useRef<boolean>();
  const startLoading = () => (loadingRef.current = true);
  const reloadPage = () => refWebview.current?.reload()

  const handleMessage = async (event: { nativeEvent: { data: string } }) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type == "SIGN_TRANSACTIONS_REQUEST") {
        handleTransactionFromWebview(data.message[0]);
      }
    } catch (error) {
      console.error("Error parsing and handling message:", error);
    }
  };

  return (
      <>
        {modalDetails && <ModalTransactionInfo
          info={modalDetails}
          onAcceptPress={onAcceptTransaction}
          buttonTextAccept={'Sign & Send'}
          onRejectPress={onCloseModal}
        />}
        <WebView
          ref={refWebview}
          scalesPageToFit
          cacheEnabled
          javaScriptEnabled
          originWhitelist={["*"]}
          source={{ uri: webViewUrl }}
          style={{flex: 1, zIndex: 1}}
          onLoadStart={startLoading}
          startInLoadingState
          onMessage={handleMessage}
          onContentProcessDidTerminate={reloadPage}
        />
      </>
  );
};
