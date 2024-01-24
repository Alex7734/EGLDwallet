import { ActivityIndicator, Pressable, Text } from "react-native";
import React from "react";

export const Button = ({ onPress, title, isLoading }: {
  onPress: () => void,
  title: string,
  isLoading?: boolean
}) => {
  return (
    <Pressable
      className={'bg-blue-500 py-2 px-4 rounded-lg'}
      onPress={onPress}
      style={({ pressed }) => [
        {
          opacity: pressed || isLoading ? 0.5 : 1
        },
      ]}
    >
      {!isLoading
        ? <Text className={'text-white text-center text-md font-medium'}>{title}</Text>
        : <ActivityIndicator color={'white'} size={'small'} />
      }
    </Pressable>
  )
}
