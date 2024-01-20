import { Text, View } from "react-native";
import React from "react";
import { TransactionInfo } from "@wallet/types/interfaces/transaction.interface";

export const TransactionListItem = ({transaction, index}: {
  transaction: TransactionInfo,
  index: number
}) => {
  return (
    <View className={'flex-row justify-center items-center w-48 self-center my-2'} style={{gap: 8}}>
      <Text className='text-md text-black font-medium'>Transaction {index+1}</Text>
      <Text className='text-md text-black font-medium'>{`${transaction.miniBlockHash}`}</Text>
    </View>
  )
}
