import React from 'react';
import { render } from "@testing-library/react-native";
import { useForm } from 'react-hook-form';
import { InputControl } from '@wallet/components/input-control';
import { FieldValues, RegisterOptions } from "react-hook-form";

type TestFormComponentProps = {
  name: keyof FieldValues;
  rules?: RegisterOptions;
};


const TestFormComponent: React.FC<TestFormComponentProps> = ({ name, rules }) => {
  const { control } = useForm();
  return (
    <>
      <InputControl
        testID={name}
        name={name}
        control={control}
        label="Test Label"
        rules={rules}
      />
    </>
  );
};

describe('InputControl', () => {
  it('renders correctly', () => {
    const { getByText } = render(<TestFormComponent name="test"/>);
    expect(getByText('Test Label')).toBeTruthy();
  });
  it('matches the snapshot', () => {
    const { toJSON } = render(<TestFormComponent name="test" />);
    expect(toJSON()).toMatchSnapshot();
  });
});
