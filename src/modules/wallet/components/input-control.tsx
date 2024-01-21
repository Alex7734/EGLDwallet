import { ControllerProps, FieldPath, FieldValues, useController } from "react-hook-form";
import { TextInput, TextInputProps, View } from "react-native";
import { FormError, FormLabel } from "@components/form";

type OmittedInputProps = Omit<
  TextInputProps,
  'editable' | 'value' | 'onChangeText'
>;

const InputControl = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
    label,
    disabled,
    ...props
  }: {
  label?: string;
  description?: string;
  dark?: boolean;
  disabled?: boolean;
  className?: string;
} & Omit<ControllerProps<TFieldValues, TName>, 'render'> &
  OmittedInputProps) => {
  const { name, control, defaultValue, rules, shouldUnregister, ...inputProps } = props;

  const { field, fieldState } = useController({
    name,
    control,
    defaultValue,
    rules,
    shouldUnregister,
  });

  return (
    <View className={'relative w-full'} pointerEvents={disabled ? 'none' : 'auto'}>
      {label && <FormLabel>{label}</FormLabel>}
      <View
        className={'flex flex-row items-center justify-between'}
      >
        <TextInput
          ref={field.ref}
          placeholderTextColor="#737374"
          className={'flex-1 py-3 px-2 font-fontRegular text-md border border-gray-300 rounded-lg'}
          onChangeText={field.onChange}
          editable={disabled}
          {...inputProps}
        />
      </View>
      <FormError error={fieldState.error} />
    </View>
  );
};

InputControl.displayName = 'InputControl';
export { InputControl };
