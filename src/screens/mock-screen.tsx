import { Pressable, Text, View } from "react-native";
import { NativeAuthClient } from "@multiversx/sdk-native-auth-client";
import { RootState } from "@store/store";
import { useSelector } from "react-redux";
import { WebView } from "react-native-webview";
import { getUserWallet } from "@wallet/store/selectors/wallet.selector";
import { UserSigner } from "@multiversx/sdk-wallet/out";
import { TEST_PASSWORD } from "@constants/api.constants";
import { useRef, useState } from "react";

export const MockScreen = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const loadingRef = useRef<boolean>();
  const [message, setMessage] = useState<string>('Hello from React Native');
  const refWebview = useRef<WebView>(null);
  const { walletAddress } = useSelector((state: RootState) => state.wallet);
  const userWallet = useSelector(getUserWallet);
  const client = new NativeAuthClient();
  const startLoading = () => (loadingRef.current = true);
  const reloadPage = () => refWebview.current?.reload()

  const sendMessageToDApp = (message: string) => {
    const script = `
    window.postMessage(${JSON.stringify(message)}, '*');
  `;
    refWebview.current?.injectJavaScript(script);
  };

  const getAccessToken = async () => {
    if (!userWallet) return;
    const init = await client.initialize();
    const messageToSign = `${walletAddress}${init}`;
    const signer = UserSigner.fromWallet(userWallet.toJSON(), TEST_PASSWORD);
    const buffer = Buffer.from(messageToSign, 'utf-8');
    const signature = await signer.sign(buffer);
    const convertedSignature = signature.toString('hex');

    const accessToken = client.getToken(walletAddress, init, convertedSignature);
    console.log(accessToken);
    sendMessageToDApp(accessToken)
  }

  const handleMessage = (event: { nativeEvent: { data: string } }) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      console.log(data);
    } catch (error) {
      console.error("Error parsing and handling message:", error);
    }
  };

  return (
    <View className={'flex-1 bg-gray-50'}>
      <Text className={'font-medium text-xl text-center'}>Mock Screen</Text>
      <Pressable onPress={getAccessToken} className={'bg-blue-500 py-2 px-4 rounded-lg mx-12 mt-8'}>
        <Text className={'text-white text-center text-md font-medium'}>Get Access Token</Text>
      </Pressable>
      <Pressable onPress={() => setIsVisible(true)} className={'bg-blue-500 py-2 px-4 rounded-lg mx-12 mt-8'}>
        <Text className={'text-white text-center text-md font-medium'}>Open web view</Text>
      </Pressable>
      <>
        {isVisible && (
          <WebView
            ref={refWebview}
            scalesPageToFit
            cacheEnabled
            javaScriptEnabled
            injectedJavaScript={`window.postMessage(${JSON.stringify(message)})`}
            originWhitelist={["*"]}
            source={{ uri: 'https://808a-188-24-94-102.ngrok-free.app/' }}
            style={{flex:1}}
            onLoadStart={startLoading}
            startInLoadingState
            onMessage={handleMessage}
            onContentProcessDidTerminate={reloadPage}
          />
        )}
      </>
    </View>
  );
};
