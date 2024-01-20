import React from 'react';
import { Animated, Pressable, Text, View } from "react-native";
import useWalletHook from "@wallet/hooks/use-wallet.hook";
import { formatBalance } from "@wallet/helpers/wallet.utils";
import ScrollView = Animated.ScrollView;

const infoTextLabel = 'text-center text-gray-400 text-lg font-semibold';
const infoTextValue = 'text-center text-gray-700 text-lg font-semibold';
const infoContainer = 'flex-col justify-center items-center self-center w-[80%]'

export const InformationWallet = () => {
  const { accountData, transactions } = useWalletHook();

  return (
    <View className={'flex-1 bg-gray-50'}>
      <View className='lex-col items-center justify-center p-4'>
        <View className='bg-white shadow-lg rounded-lg p-4 w-[90%]'>
          <Text className={'text-center text-gray-700 text-xl font-semibold mb-8'}>Your wallet</Text>
          <View style={{gap: 16}}>
            <View className={infoContainer} style={{gap: 8}}>
              <Text className={infoTextLabel}>Address</Text>
              <Text className={infoTextValue}>{`${accountData?.address}`}</Text>
            </View>
            <View className={infoContainer} style={{gap: 8}}>
              <Text className={infoTextLabel}>Balance</Text>
              <Text className={infoTextValue}>{`${formatBalance(accountData?.balance)} XeGLD`}</Text>
            </View>
            <Pressable className={'bg-blue-500 py-2 px-4 rounded-lg mx-12'}>
              <Text className={'text-white text-center text-md font-medium'}>Send Transaction</Text>
            </Pressable>
          </View>
          <Text className={'text-center text-gray-400 text-lg font-semibold my-8'}>Last 10 transactions</Text>
          <ScrollView className={'h-48'}>
            {transactions?.slice(0,10).map((transaction, index) => {
              return (
                <View key={index} className={'flex-row justify-center items-center w-48 self-center my-2'} style={{gap: 8}}>
                  <Text className='text-md text-black font-medium'>Transaction {index+1}</Text>
                  <Text className='text-md text-black font-medium'>{`${transaction.miniBlockHash}`}</Text>
                </View>
              )
            })}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};
