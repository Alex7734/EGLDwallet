import React from "react";
import { Keyboard, Text, TouchableWithoutFeedback, View } from "react-native";
import { SendTransactionForm } from "@wallet/components/send-transaction-form";

export const SendTransaction = () => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className={'flex-1 bg-gray-50'}>
        <View className='flex-col items-center justify-center p-4'>
          <View className='bg-white shadow-lg rounded-lg p-4 w-[90%]'>
            <Text className='text-lg text-black font-medium self-center'>Send Transaction</Text>
            <SendTransactionForm />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
