import React from 'react';
import { Text, View } from "react-native";
import { ImportWalletForm } from '@wallet/components/input-wallet-form';
import { StackScreenProps } from "@react-navigation/stack";
import { AppNavigatorParamList, AppNavigatorRoutes } from "@navigation/routes/app-navigator-routes";

export const ImportWallet = ({navigation, route}: StackScreenProps<AppNavigatorParamList, AppNavigatorRoutes.WalletImport>) => {
  return (
    <View className={'flex-1 bg-gray-50'}>
      <View className="flex flex-col items-center justify-center p-4">
        <View className="bg-white shadow-lg rounded-lg p-6 w-80">
          <Text className={'text-center text-gray-700 text-lg font-semibold mb-8'}>Welcome, import your wallet</Text>
          <ImportWalletForm navigation={navigation} route={route} />
        </View>
      </View>
    </View>
  );
};
