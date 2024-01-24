import { View } from "react-native";
import { InputControl } from "@components/input-control";
import { Button } from "@components/button";
import { Form } from "@components/form";
import React from "react";
import { useSendTransactionForm } from "@wallet/hooks/use-send-transaction-form.hook";

export const SendTransactionForm = () => {
  const { form, handleSubmit, isLoading } = useSendTransactionForm();

  return (
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
          keyboardType={'numeric'}
          label={'Amount'}
          control={form.control}
        />
        <Button
          onPress={form.handleSubmit(handleSubmit)}
          title={'Send Transaction'}
          isLoading={isLoading}
        />
      </View>
    </Form>
  )
}
