import React, { useState } from "react";
import { ActivityIndicator, Keyboard, Pressable, Text, TextInput, View } from "react-native";
import useWalletHook from '@wallet/hooks/use-wallet.hook';

const InputWallet: React.FC = () => {
  const [words, setWords] = useState<string>('');
  const { importWallet, isAccountDataLoading } = useWalletHook();

  const handleImportWallet = () => {
    Keyboard.dismiss();
    importWallet(words);
  };

  return (
    <View>
      <Text className={'text-center text-gray-700 text-lg font-semibold mb-4'}>Welcome, import your wallet</Text>
      <TextInput
        multiline
        value={words}
        onChangeText={setWords}
        placeholder="Enter your 24 words"
        className={'border border-gray-300 rounded-lg p-2 mb-4 h-24'}
      />
      <Pressable onPress={handleImportWallet} className={'bg-blue-500 py-2 px-4 rounded-lg'}>
        {!isAccountDataLoading ? <Text className={'text-white text-center text-md font-medium'}>Import wallet</Text> : <ActivityIndicator size={'small'} />}
      </Pressable>
    </View>
  );
};

export default InputWallet;
