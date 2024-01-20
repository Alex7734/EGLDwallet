import React, { useState } from "react";
import { ActivityIndicator, Keyboard, Pressable, Text, TextInput, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { isValidMnemonicFormat } from "@wallet/helpers/wallet.utils";
import { setLoading, setMnemonics } from "@wallet/store/wallet.slice";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AppNavigatorParamList, AppNavigatorRoutes } from "@navigation/routes/app-navigator-routes";
import { RootState } from "@store/store";

const InputWallet = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp<AppNavigatorParamList>>();
  const isLoading = useSelector((state: RootState) => state.wallet.isLoading);
  const [words, setWords] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  const handleImportWallet = () => {
    dispatch(setLoading(true));
    Keyboard.dismiss();

    if (!isValidMnemonicFormat(words)) {
      setError(true)
      dispatch(setLoading(false));
      return;
    }

    dispatch(setMnemonics(words));
    navigation.reset({
      index: 0,
      routes: [{ name: AppNavigatorRoutes.WalletApp }],
    });
    dispatch(setLoading(false));
  }

  return (
    <View>
      <Text className={'text-center text-gray-700 text-lg font-semibold mb-4'}>Welcome, import your wallet</Text>
      <TextInput
        onFocus={() => setError(false)}
        multiline
        value={words}
        onChangeText={setWords}
        placeholder="Enter your 24 words"
        className={'border border-gray-300 rounded-lg p-2 mb-4 h-24'}
      />
      <Pressable onPress={handleImportWallet} className={'bg-blue-500 py-2 px-4 rounded-lg'}>
        {isLoading
          ? <ActivityIndicator color={'white'} size={'small'} />
          : <Text className={'text-white text-center text-md font-medium'}>Import wallet</Text>}
      </Pressable>
      {error && <Text className={'text-center text-red-500 text-md font-medium'}>Invalid mnemonic format</Text>}
    </View>
  );
};

export default InputWallet;
