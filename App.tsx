import React from 'react';
import { SafeAreaView, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { AppNavigator } from "@navigation/navigators/app-navigator";
import { Provider } from "react-redux";
import store from "./src/store/store";

function App(): React.JSX.Element {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView className={'flex-1 bg-gray-50'}>
       <Provider store={store}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
       </Provider>
      </SafeAreaView>
    </>
  );
}

export default App;
