import { View } from "react-native";
import { AppNavigatorParamList, AppNavigatorRoutes } from "@navigation/routes/app-navigator-routes";
import { StackScreenProps } from "@react-navigation/stack";
import { InputControl } from "@components/input-control";
import { Form } from "@components/form";
import { Button } from "@components/button";
import { useImportWalletForm } from "@wallet/hooks/use-import-wallet-form.hook";


export const ImportWalletForm = ({navigation, route}: StackScreenProps<AppNavigatorParamList, AppNavigatorRoutes.WalletImport>) => {
  const onNavigate = () => navigation.navigate(AppNavigatorRoutes.WalletApp);
  const { form, handleImportWallet } = useImportWalletForm({ onNavigate });

  return (
    <Form {...form}>
      <InputControl
        multiline
        name={'mnemonic'}
        label={'Mnemonic Words'}
        placeholder={'Enter your 24 words'}
        control={form.control}
      />
      <View className={'mt-2'}>
        <Button onPress={form.handleSubmit(handleImportWallet)} title={'Import wallet'} />
      </View>
    </Form>
  );
};

