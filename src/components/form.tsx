import { forwardRef } from "react";
import { Text, TextProps, View } from "react-native";
import { FieldError, FormProvider } from "react-hook-form";

const Form = FormProvider;

const FormLabel = forwardRef<Text, TextProps>(
  ({ className, ...props }, ref) => {
    return (
      <View className='absolute -top-2 left-4 z-40 flex items-start'>
        <Text
          ref={ref}
          className={'text-xs text-black bg-white px-2'}
        >
          {props.children}
        </Text>
      </View>
    );
  },
);
FormLabel.displayName = 'FormLabel';

const FormError = forwardRef<Text, TextProps & { error?: FieldError }>(
  ({ error, className, children, ...props }, ref) => {
    const body = error ? String(error?.message) : children;

    if (body == undefined) {
      return null;
    }

    return (
      <Text
        ref={ref}
        className={'ml-1 text-red-400'}
        {...props}
      >
        {body}
      </Text>
    );
  },
);
FormError.displayName = 'FormError';

export { FormLabel, FormError, Form }
