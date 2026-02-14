import React from 'react';
import {
  Text,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  View,
} from 'react-native';
import tw from '~configs/tw';

export interface TextInputProps
  extends Omit<RNTextInputProps, 'value' | 'onChangeText'> {
  label?: string;
  value?: string;
  onChangeText: (value: string) => void;
  error?: string;
  required?: boolean;
  helperText?: string;
}

export function TextInput({
  label,
  value = '',
  onChangeText,
  error,
  required = false,
  helperText,
  editable = true,
  ...restProps
}: TextInputProps) {
  const showError = Boolean(error);

  return (
    <View style={tw`w-full mb-4`}>
      {label ? (
        <Text style={tw`text-gray-800 text-sm font-medium mb-2`}>
          {label}
          {required ? <Text style={tw`text-red-500`}> *</Text> : null}
        </Text>
      ) : null}

      <RNTextInput
        value={value}
        onChangeText={onChangeText}
        editable={editable}
        placeholderTextColor="#9CA3AF"
        style={tw.style(
          'border rounded-xl px-4 py-3 text-gray-900 bg-white',
          showError ? 'border-red-500' : 'border-gray-300',
          !editable ? 'bg-gray-100 text-gray-500' : '',
        )}
        {...restProps}
      />

      {showError ? (
        <Text style={tw`text-red-500 text-xs mt-1`}>{error}</Text>
      ) : helperText ? (
        <Text style={tw`text-gray-500 text-xs mt-1`}>{helperText}</Text>
      ) : null}
    </View>
  );
}

export default TextInput;
