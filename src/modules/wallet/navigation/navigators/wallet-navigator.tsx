import {createStackNavigator} from '@react-navigation/stack';
import { WalletRoutes } from "@wallet/navigation/routes/wallet-routes";
import { MockScreen } from "@screens/mock-screen";
import { InformationWallet } from "@wallet/screens/information-wallet";

const Stack = createStackNavigator();

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
        component={MockScreen}
      />
      <Stack.Screen
        name={WalletRoutes.SuccessTransaction}
        component={MockScreen}
      />
    </Stack.Navigator>
  );
};
