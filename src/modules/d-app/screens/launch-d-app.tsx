import { Text, View } from "react-native";
import { Button } from "@components/button";
import { useAccessToken } from "../hooks/use-access-token.hook";
import { StackScreenProps } from "@react-navigation/stack";
import { DAppParamList, DAppRoutes } from "../navigation/routes/d-app-routes";

export const LaunchDApp = ({navigation} : StackScreenProps<DAppParamList, DAppRoutes.LaunchWebview>) => {
  const { getAccessToken } = useAccessToken();

  const handleLaunch = async () => {
    const accessToken = await getAccessToken();
    if (accessToken == undefined) {
      console.log('No access token available.');
      return;
    }
    navigation.navigate(DAppRoutes.Webview, {accessToken});
  }

  return (
    <View className={'flex-1 bg-gray-50'}>
      <Text className={'font-medium text-xl text-center'}>Launch D-App</Text>
      <View className={'flex-1 justify-center items-center'}>
        <Button onPress={handleLaunch} title={'Launch D-App'} />
      </View>
    </View>
  )
}
