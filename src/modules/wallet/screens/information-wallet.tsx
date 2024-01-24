import React from 'react';
import { Text, View, ScrollView, ActivityIndicator } from "react-native";
import { formatBalance } from "@wallet/helpers/wallet.utils";
import { TransactionListItem } from "@wallet/components/transaction-list-item";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { WalletParamList, WalletRoutes } from "@wallet/navigation/routes/wallet-routes";
import { Button } from "@components/button";
import { useAccountInfo } from "@wallet/hooks/use-account-info.hook";

const infoTextLabel = 'text-center text-gray-400 text-lg font-semibold';
const infoTextValue = 'text-center text-gray-700 text-lg font-semibold';
const infoContainer = 'flex-col justify-center items-center self-center w-[80%]'

export const InformationWallet = () => {
  const navigation = useNavigation<NavigationProp<WalletParamList>>();
  const {
    accountData,
    isFetchingAccountData,
    transactions,
    isFetchingTransactions,
  } = useAccountInfo();

  const handleSendTransaction = () => {
    navigation.navigate(WalletRoutes.MakeTransaction)
  }

  return (
    <View className={'flex-1 bg-gray-50'}>
      <View className='flex-col items-center justify-center p-4'>
        <View className='bg-white shadow-lg rounded-lg p-4 w-[90%]'>
          <Text className={'text-center text-gray-700 text-xl font-semibold mb-8'}>Your wallet</Text>
          {!isFetchingAccountData ?
            <View style={{gap: 16}}>
            <View className={infoContainer} style={{gap: 8}}>
              <Text className={infoTextLabel}>Address</Text>
              <Text className={infoTextValue}>{`${accountData?.address}`}</Text>
            </View>
            <View className={infoContainer} style={{gap: 8}}>
              <Text className={infoTextLabel}>Balance</Text>
              <Text className={infoTextValue}>{`${formatBalance(accountData?.balance)} XeGLD`}</Text>
            </View>
              <View className={'mx-12'} >
                <Button onPress={handleSendTransaction} title={'Send Transaction'} />
              </View>
          </View>
            : <ActivityIndicator color={'blue'} size={'large'} />}
          <Text className={'text-center text-gray-400 text-lg font-semibold my-8'}>Last 10 transactions</Text>
          <ScrollView className={'h-48'}>
            {!isFetchingTransactions ? transactions?.slice(0,10).map((transaction, index) =>
              <TransactionListItem key={index} transaction={transaction} index={index} />
            ) : <ActivityIndicator color={'blue'} size={'large'} />}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};
