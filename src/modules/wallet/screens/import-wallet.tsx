import React from 'react';
import { View } from 'react-native';
import InputWallet from '@wallet/components/input-wallet';

export const ImportWallet = () => {
  return (
    <View className={'flex-1 bg-gray-50'}>
      <View className="flex flex-col items-center justify-center p-4">
        <View className="bg-white shadow-lg rounded-lg p-6 w-80">
          <InputWallet />
        </View>
      </View>
    </View>
  );
};
