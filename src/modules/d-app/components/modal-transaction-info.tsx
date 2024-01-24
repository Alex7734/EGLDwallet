import React from 'react';
import { Text, View } from "react-native";
import { Button } from "@components/button";

type ModalTransactionInfoProps = {
  info: string;
  buttonTextAccept?: string;
  buttonTextReject?: string;
  onAcceptPress: () => void;
  onRejectPress: () => void;
};
export const ModalTransactionInfo = (props: ModalTransactionInfoProps) => {
  const buttonTextAccept = props.buttonTextAccept ?? 'OK';
  const buttonTextReject = props.buttonTextReject ?? 'Cancel';

  return (
    <View className={'m-auto flex w-full max-w-sm rounded-3xl bg-background px-5 py-6 w-30 z-10'}>
      <View style={{ gap: 24 }}>
        <Text className={'text-lg leading-6'}>
          {props.info}
        </Text>
        <View className={'flex flex-row justify-center items-center'} style={{gap: 16}}>
          <Button onPress={props.onRejectPress} title={buttonTextReject}/>
          <Button onPress={props.onAcceptPress} title={buttonTextAccept}/>
        </View>
      </View>
    </View>
  );
};
