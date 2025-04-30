import React from 'react';
import { Controller, FieldValues } from 'react-hook-form';
import { View } from 'react-native';
import { FormInputProps } from '~types/input.type';
import TextInput from './TextInput';

const FormInput = <T extends FieldValues, F>({
  control,
  name,
  errors,
  type,
  wrapperProps,
  wrapChange,
  wrapValue,
  ...props
}: FormInputProps<T, F>) => {
  const renderInput = ({ field: { onChange, onBlur, value } }: any) => {
    const _onChange = (val: any) => {
      const _value = wrapChange ? wrapChange(val) : val;
      onChange(_value);
    };

    const newValue = wrapValue ? wrapValue(value) : value;
    const error = errors?.[name]?.message as string;

    switch (type) {
      case 'text-input':
        return (
          <TextInput
            value={newValue}
            onChangeText={_onChange}
            onBlur={onBlur}
            wrapperProps={{
              ...wrapperProps,
              error,
            }}
            {...props}
          />
        );

      default:
        return <View />;
    }
  };

  return <Controller control={control} name={name} render={renderInput} />;
};

export default FormInput;
