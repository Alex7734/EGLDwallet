import { PropsWithChildren } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

export type ModalProps = {
  onPress?: () => void;
  enteringDurationMs?: number;
  containerClassName?: string;
  delay?: number;
} & PropsWithChildren;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const Modal = (props: ModalProps) => {
  const renderBlurView = () => {
    return (
      <View
        style={StyleSheet.absoluteFill}
        className={'justify-center p-8 items-center'}
      >
        {props.children}
      </View>
    );
  }

  return (
    <AnimatedPressable
      disabled={!props.onPress}
      onPress={props.onPress}
      className="flex-1 z-20"
      style={StyleSheet.absoluteFill}
      entering={FadeIn.duration(props.enteringDurationMs ?? 250).delay(props.delay ?? 0)}
      exiting={FadeOut.duration(150)}
    >
      {renderBlurView}
    </AnimatedPressable>
  );
};
