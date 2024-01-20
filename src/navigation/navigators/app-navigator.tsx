import { createStackNavigator } from "@react-navigation/stack";
import { AppNavigatorRoutes } from "../routes/app-navigator-routes";
import { BottomTabNavigator } from "./bottom-tab-navigator";
import { ImportWallet } from "@wallet/screens/import-wallet";

const Stack = createStackNavigator();

export const AppNavigator = () => {
  return(
    <Stack.Navigator
      initialRouteName={AppNavigatorRoutes.WalletImport}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={AppNavigatorRoutes.WalletImport}
        component={ImportWallet}
      />

      <Stack.Screen name={AppNavigatorRoutes.WalletApp} component={BottomTabNavigator} />
    </Stack.Navigator>
  )
}
