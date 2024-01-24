import {createStackNavigator} from '@react-navigation/stack';
import { WalletParamList, WalletRoutes } from "@wallet/navigation/routes/wallet-routes";
import { InformationWallet } from "@wallet/screens/information-wallet";
import { SendTransaction } from "@wallet/screens/send-transaction-wallet";
import { SuccessTransaction } from "@wallet/screens/success-transaction-wallet";

const Stack = createStackNavigator<WalletParamList>();

export const WalletNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={WalletRoutes.Wallet}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={WalletRoutes.Wallet} component={InformationWallet} />
      <Stack.Screen
        name={WalletRoutes.MakeTransaction}
        component={SendTransaction}
      />
      <Stack.Screen
        name={WalletRoutes.SuccessTransaction}
        component={SuccessTransaction}
      />
    </Stack.Navigator>
  );
};
