import React from 'react';
import { SafeAreaView, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { AppNavigator } from "@navigation/navigators/app-navigator";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from "./src/store/store";

function App(): React.JSX.Element {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView className={'flex-1 bg-gray-50'}>
       <Provider store={store}>
         <PersistGate loading={null} persistor={persistor}>
           <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
         </PersistGate>
       </Provider>
      </SafeAreaView>
    </>
  );
}

export default App;
