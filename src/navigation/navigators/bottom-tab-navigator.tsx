import {BottomTabRoutes} from '../routes/bottom-tab-routes';
import {WalletNavigator} from "@wallet/navigation/navigators/wallet-navigator";
import {WebviewNavigator} from '../../modules/d-app/navigation/navigators/d-app-navigartor';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {
  BOTTOM_TAB_NAVIGATOR_ACTIVE_COLOR, BOTTOM_TAB_NAVIGATOR_INACTIVE_COLOR,
  bottomTabNavigatorStyle
} from "@navigation/navigators/styles/bottom-tab-navigator.style";

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: BOTTOM_TAB_NAVIGATOR_ACTIVE_COLOR,
        tabBarInactiveTintColor: BOTTOM_TAB_NAVIGATOR_INACTIVE_COLOR,
        tabBarStyle: bottomTabNavigatorStyle.bottomTab,
      }}>
      <Tab.Screen name={BottomTabRoutes.Wallet} component={WalletNavigator} />
      <Tab.Screen name={BottomTabRoutes.Webview} component={WebviewNavigator} />
    </Tab.Navigator>
  );
};


