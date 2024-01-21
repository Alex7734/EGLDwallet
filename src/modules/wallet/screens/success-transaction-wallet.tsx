import { StackScreenProps } from "@react-navigation/stack";
import { WalletParamList, WalletRoutes } from "@wallet/navigation/routes/wallet-routes";
import { Text, View, Linking, Pressable } from "react-native";
import { TESTNET_EXPLORER_URL } from "@constants/api.constants";

export const SuccessTransaction = ({ navigation, route }: StackScreenProps<WalletParamList, WalletRoutes.SuccessTransaction>) => {
  const transactionInformation = route.params?.transactionInformation;

  if (!transactionInformation) {
    return <View><Text>No transaction information available.</Text></View>;
  }

  const handleExplorer = async () => {
    return await Linking.openURL(`${TESTNET_EXPLORER_URL}/transactions/${transactionInformation.txHash}`);
  };

  return (
    <View className={'flex-1 bg-gray-50'}>
      <View className={'flex-1 justify-center items-center'} style={{gap: 24}}>
        <Text className={'text-2xl text-black font-semibold'}>Transaction Successful</Text>
        <View className={'flex-col justify-center items-center w-4/5'}>
          <Text className={'text-md text-black font-bold'}>{`${transactionInformation.amount} XeGLD`}</Text>
          <Text className={'text-sm text-gray-400 font-medium'}>successfully sent to</Text>
          <Text className={'text-md text-black font-medium w-4/5'}>{transactionInformation.receiverAddress}</Text>
        </View>
        <View className={'flex-col justify-center items-center w-4/5'}>
          <Text className={'text-md text-gray-400'}>Transaction hash:</Text>
          <Text className={'text-md text-black font-medium self-center w-4/5'}>{transactionInformation.txHash}</Text>
        </View>
        <Text className={'text-md text-blue-500 font-medium underline'} onPress={handleExplorer}>View on explorer</Text>
        <Pressable className={'bg-blue-500 py-2 px-4 rounded-lg'}>
          <Text className={'text-md text-white font-medium'} onPress={() => navigation.navigate(WalletRoutes.Wallet)}>Go back to wallet</Text>
        </Pressable>
      </View>
    </View>
  )
}
