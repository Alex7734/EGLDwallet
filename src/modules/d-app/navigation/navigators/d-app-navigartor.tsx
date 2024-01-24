import { DAppParamList, DAppRoutes } from "../routes/d-app-routes";
import {createStackNavigator} from '@react-navigation/stack';
import { MockScreen } from "@screens/mock-screen";

const Stack = createStackNavigator<DAppParamList>();

export const DAppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={DAppRoutes.LaunchWebview}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={DAppRoutes.LaunchWebview} component={MockScreen} />
      <Stack.Screen name={DAppRoutes.Webview} component={MockScreen} />
    </Stack.Navigator>
  );
};
