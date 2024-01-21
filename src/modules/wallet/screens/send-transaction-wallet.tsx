import React from "react";
import { ActivityIndicator, Keyboard, Pressable, Text, TouchableWithoutFeedback, View } from "react-native";
import { useForm } from "react-hook-form";
import { SendTransactionData, sendTransactionSchema } from "@wallet/schemas/wallet.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputControl } from "@wallet/components/input-control";
import { Form } from "@components/form";
import { AppDispatch, RootState } from "@store/store";
import { useDispatch, useSelector } from "react-redux";
import { ConfirmTransactionInfo } from "@wallet/types/interfaces/wallet-state.interface";
import { setLatestTransactionData } from "@wallet/store/wallet.slice";
import { getUserWallet } from "@wallet/store/selectors/wallet.selector";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { WalletParamList, WalletRoutes } from "@wallet/navigation/routes/wallet-routes";
import { useSendTransactionMutation } from "@wallet/services/wallet.service";


export const SendTransaction = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<NavigationProp<WalletParamList>>();
  const [sendTransaction, { isLoading, isError }] = useSendTransactionMutation();

  const accountData = useSelector((state: RootState) => state.wallet.accountData);
  const userWallet = useSelector(getUserWallet);

  const form = useForm<SendTransactionData>({
    resolver: zodResolver(sendTransactionSchema),
  });

  const handleSubmit = async (data: SendTransactionData) => {
    Keyboard.dismiss();
    if (!accountData || !userWallet) return;

    const transactionHash = await sendTransaction({ data, accountData, userWallet }).unwrap();

    if(isError) {
      // TODO: Replace with a toast
      return;
    }

    const transactionInformation: ConfirmTransactionInfo = {
      amount: data.amount,
      receiverAddress: data.address.bech32(),
      txHash: transactionHash,
    }

    navigation.reset({
      index: 0,
      routes: [{ name: WalletRoutes.SuccessTransaction, params: { transactionInformation } }],
    });

    dispatch(setLatestTransactionData(transactionInformation));
  }

  // TODO: Maybe move the form to a separate component
  // TODO: Create a generic button component

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className={'flex-1 bg-gray-50'}>
        <View className='flex-col items-center justify-center p-4'>
          <View className='bg-white shadow-lg rounded-lg p-4 w-[90%]'>
            <Text className='text-lg text-black font-medium self-center'>Send Transaction</Text>
            <Form {...form}>
              <View className={'flex-col justify-center items-center px-2 mt-8'} style={{gap: 16}}>
                <InputControl
                  name={'address'}
                  autoCapitalize="none"
                  label={'Address'}
                  control={form.control}
                />
                <InputControl
                  name={'amount'}
                  keyboardType={'numbers-and-punctuation'}
                  label={'Amount'}
                  control={form.control}
                />
                <Pressable className={'bg-blue-500 py-2 px-4 rounded-lg'} onPress={form.handleSubmit(handleSubmit)}>
                  {!isLoading
                    ? <Text className={'text-white text-center text-md font-medium'}>Send Transaction</Text>
                    : <ActivityIndicator color={'white'} size={'small'} />
                  }
                </Pressable>
              </View>
            </Form>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
