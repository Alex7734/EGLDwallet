import { createStackNavigator } from "@react-navigation/stack";
import { AppNavigatorParamList, AppNavigatorRoutes } from "../routes/app-navigator-routes";
import { BottomTabNavigator } from "./bottom-tab-navigator";
import { ImportWallet } from "@wallet/screens/import-wallet";
import { useSelector } from "react-redux";
import { RootState } from "@store/store";

const Stack = createStackNavigator<AppNavigatorParamList>();

export const AppNavigator = () => {
  const mnemonics = useSelector((state: RootState) => state.wallet.mnemonic);
  const initialRouteName = mnemonics ? AppNavigatorRoutes.WalletApp : AppNavigatorRoutes.WalletImport;

  return(
    <Stack.Navigator
      initialRouteName={initialRouteName}
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
