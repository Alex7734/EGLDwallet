import { DAppParamList, DAppRoutes } from "../routes/d-app-routes";
import {createStackNavigator} from '@react-navigation/stack';
import { WebviewDApp } from "@d-app/screens/webview-d-app";
import { LaunchDApp } from "@d-app/screens/launch-d-app";

const Stack = createStackNavigator<DAppParamList>();

export const DAppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={DAppRoutes.LaunchWebview}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={DAppRoutes.LaunchWebview} component={LaunchDApp} />
      <Stack.Screen name={DAppRoutes.Webview} component={WebviewDApp} />
    </Stack.Navigator>
  );
};
